import type {NextApiRequest, NextApiResponse} from 'next';
import * as z from 'zod';

const bodySchema = z.object({
  name: z.string().trim().min(1, 'Name is required.').max(80),
  contact: z.string().trim().max(200).optional().or(z.literal('')),
  message: z.string().trim().min(2, 'Message is too short.').max(2000),
  // Honeypot — should always be empty for real users.
  website: z.string().max(0).optional().or(z.literal('')),
});

type ChatResponse = {ok: true} | {ok: false; error: string};

// Very small in-memory rate limiter (best-effort; resets on cold start).
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;
const hits = new Map<string, {count: number; reset: number}>();

const getClientIp = (req: NextApiRequest): string => {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0]?.trim() ?? 'unknown';
  }
  return req.socket.remoteAddress ?? 'unknown';
};

const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, {count: 1, reset: now + RATE_WINDOW_MS});
    return false;
  }
  entry.count += 1;
  if (entry.count > RATE_MAX) return true;
  return false;
};

const escapeHtml = (value: string): string =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

export default async function handler(req: NextApiRequest, res: NextApiResponse<ChatResponse>): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ok: false, error: 'Method not allowed.'});
    return;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    res.status(500).json({ok: false, error: 'Chat is not configured.'});
    return;
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    res.status(429).json({ok: false, error: 'Too many messages. Please try again later.'});
    return;
  }

  const parsed = bodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid payload.'});
    return;
  }

  const {name, contact, message, website} = parsed.data;

  // Honeypot triggered — pretend success so bots go away quietly.
  if (website && website.length > 0) {
    res.status(200).json({ok: true});
    return;
  }

  const referer = typeof req.headers.referer === 'string' ? req.headers.referer : 'unknown';
  const userAgent = typeof req.headers['user-agent'] === 'string' ? req.headers['user-agent'] : 'unknown';

  const text = [
    '<b>💬 New site chat message</b>',
    '',
    `<b>From:</b> ${escapeHtml(name)}`,
    contact ? `<b>Contact:</b> ${escapeHtml(contact)}` : null,
    '',
    `<b>Message:</b>\n${escapeHtml(message)}`,
    '',
    `<i>Page:</i> ${escapeHtml(referer)}`,
    `<i>IP:</i> ${escapeHtml(ip)}`,
    `<i>UA:</i> ${escapeHtml(userAgent)}`,
  ]
    .filter(Boolean)
    .join('\n');

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    if (!tgRes.ok) {
      const detail = await tgRes.text().catch(() => '');
      // eslint-disable-next-line no-console
      console.error('Telegram sendMessage failed', tgRes.status, detail);
      res.status(502).json({ok: false, error: 'Failed to deliver message.'});
      return;
    }

    res.status(200).json({ok: true});
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Telegram request error', err);
    res.status(502).json({ok: false, error: 'Failed to deliver message.'});
  }
}
