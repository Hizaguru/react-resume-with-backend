import {zodResolver} from '@hookform/resolvers/zod';
import {AnimatePresence, motion} from 'framer-motion';
import {Loader2, MessageCircle, Send, X} from 'lucide-react';
import {FC, memo, useCallback, useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'sonner';
import * as z from 'zod';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';

const chatSchema = z.object({
  name: z.string().trim().min(1, 'Please enter your name.').max(80),
  contact: z.string().trim().max(200).optional().or(z.literal('')),
  message: z.string().trim().min(2, 'Message is too short.').max(2000, 'Message is too long.'),
  // Honeypot — hidden field, must stay empty.
  website: z.string().max(0).optional().or(z.literal('')),
});

type ChatFormValues = z.infer<typeof chatSchema>;

const ChatWidget: FC = memo(() => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isSubmitting},
  } = useForm<ChatFormValues>({
    resolver: zodResolver(chatSchema),
    defaultValues: {name: '', contact: '', message: '', website: ''},
  });

  const {ref: nameFieldRef, ...nameFieldRest} = register('name');

  const close = useCallback((): void => setOpen(false), []);

  const onSubmit = useCallback(
    async (values: ChatFormValues): Promise<void> => {
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: {'content-type': 'application/json'},
          body: JSON.stringify(values),
        });
        const data = (await res.json().catch(() => ({}))) as {ok?: boolean; error?: string};
        if (!res.ok || !data.ok) {
          toast.error(data.error ?? 'Failed to send message. Please try again.');
          return;
        }
        toast.success("Thanks — I'll see it on my phone shortly.");
        reset();
        setOpen(false);
      } catch (err) {
        toast.error('Network error. Please try again.', {
          description: err instanceof Error ? err.message : undefined,
        });
      }
    },
    [reset],
  );

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') close();
    };
    globalThis.addEventListener('keydown', onKey);
    return () => globalThis.removeEventListener('keydown', onKey);
  }, [open, close]);

  // Allow other components (e.g. Hero CTA) to open the chat via a custom event.
  useEffect(() => {
    const onOpen = (): void => setOpen(true);
    globalThis.addEventListener('chat:open', onOpen);
    return () => globalThis.removeEventListener('chat:open', onOpen);
  }, []);

  // Autofocus first field when opened.
  useEffect(() => {
    if (open) {
      const t = globalThis.setTimeout(() => firstFieldRef.current?.focus(), 120);
      return () => globalThis.clearTimeout(t);
    }
    return undefined;
  }, [open]);

  return (
    <div
      aria-live="polite"
      className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            animate={{opacity: 1, y: 0, scale: 1}}
            aria-label="Chat with me"
            aria-modal="false"
            className="w-[min(92vw,22rem)] origin-bottom-right overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
            exit={{opacity: 0, y: 12, scale: 0.96}}
            initial={{opacity: 0, y: 12, scale: 0.96}}
            key="panel"
            ref={panelRef}
            role="dialog"
            transition={{duration: 0.18, ease: 'easeOut'}}>
            <div className="flex items-center justify-between gap-2 border-b border-border bg-muted/40 px-4 py-3">
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Send me a message</span>
                <span className="text-xs text-muted-foreground">Delivered to my phone</span>
              </div>
              <Button aria-label="Close chat" onClick={close} size="icon-sm" type="button" variant="ghost">
                <X />
              </Button>
            </div>

            <form className="flex flex-col gap-3 px-4 py-4" noValidate onSubmit={handleSubmit(onSubmit)}>
              <p className="text-xs text-muted-foreground">{"Send me a message and I'll get back to you."}</p>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="chat-name">Name</Label>
                <Input
                  aria-invalid={errors.name ? true : undefined}
                  autoComplete="name"
                  id="chat-name"
                  placeholder="Your name"
                  type="text"
                  {...nameFieldRest}
                  ref={el => {
                    nameFieldRef(el);
                    firstFieldRef.current = el;
                  }}
                />
                {errors.name ? <p className="text-xs text-destructive">{errors.name.message}</p> : null}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="chat-contact">Email or phone (optional)</Label>
                <Input
                  autoComplete="email"
                  id="chat-contact"
                  placeholder="how can I reach you back?"
                  type="text"
                  {...register('contact')}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="chat-message">Message</Label>
                <Textarea
                  aria-invalid={errors.message ? true : undefined}
                  id="chat-message"
                  placeholder="Say hi…"
                  rows={4}
                  {...register('message')}
                />
                {errors.message ? <p className="text-xs text-destructive">{errors.message.message}</p> : null}
              </div>

              {/* Honeypot — hidden from users, visible to bots. */}
              <div aria-hidden="true" className="hidden" tabIndex={-1}>
                <label>
                  {'Website'}
                  <input autoComplete="off" tabIndex={-1} type="text" {...register('website')} />
                </label>
              </div>

              <Button className="mt-1" disabled={isSubmitting} type="submit">
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    <Send /> Send
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        aria-expanded={open}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className="inline-flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        onClick={() => setOpen(v => !v)}
        type="button"
        whileHover={{scale: 1.05}}
        whileTap={{scale: 0.95}}>
        <AnimatePresence initial={false} mode="wait">
          {open ? (
            <motion.span
              animate={{rotate: 0, opacity: 1}}
              exit={{rotate: 90, opacity: 0}}
              initial={{rotate: -90, opacity: 0}}
              key="close"
              transition={{duration: 0.15}}>
              <X className="size-6" />
            </motion.span>
          ) : (
            <motion.span
              animate={{rotate: 0, opacity: 1}}
              exit={{rotate: -90, opacity: 0}}
              initial={{rotate: 90, opacity: 0}}
              key="open"
              transition={{duration: 0.15}}>
              <MessageCircle className="size-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
});

ChatWidget.displayName = 'ChatWidget';

export default ChatWidget;
