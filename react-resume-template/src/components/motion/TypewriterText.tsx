import { useReducedMotion } from 'framer-motion';
import { CSSProperties, FC, Fragment, useEffect, useMemo, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

export interface TypewriterSegment {
  text: string;
  className?: string;
}

interface TypewriterTextProps {
  segments: TypewriterSegment[];
  className?: string;
  ariaLabel?: string;
  /** Milliseconds between each character appearing. */
  charDelay?: number;
  /** Initial delay before the first character appears. */
  startDelay?: number;
  /** Show a caret that follows the typing position. */
  showCaret?: boolean;
  caretClassName?: string;
  /** IntersectionObserver threshold; 0–1. */
  threshold?: number;
}

interface Token {
  charIndex: number;
  char: string;
  segmentIndex: number;
  isWhitespace: boolean;
}

interface Word {
  segmentIndex: number;
  chars: Token[];
}

type FlowItem = {kind: 'word'; word: Word} | {kind: 'ws'; chars: Token[]};

const buildFlow = (segments: TypewriterSegment[]): FlowItem[] => {
  const items: FlowItem[] = [];
  let globalIndex = 0;
  let currentWord: Word | null = null;
  let currentWs: Token[] | null = null;

  for (let si = 0; si < segments.length; si += 1) {
    const seg = segments[si];
    for (const ch of Array.from(seg.text)) {
      const isWs = /\s/.test(ch);
      const tok: Token = {charIndex: globalIndex, char: ch, segmentIndex: si, isWhitespace: isWs};
      globalIndex += 1;
      if (isWs) {
        if (currentWord) {
          items.push({kind: 'word', word: currentWord});
          currentWord = null;
        }
        if (!currentWs) currentWs = [];
        currentWs.push(tok);
      } else {
        if (currentWs) {
          items.push({kind: 'ws', chars: currentWs});
          currentWs = null;
        }
        if (!currentWord || currentWord.segmentIndex !== si) {
          if (currentWord) items.push({kind: 'word', word: currentWord});
          currentWord = {segmentIndex: si, chars: []};
        }
        currentWord.chars.push(tok);
      }
    }
  }
  if (currentWord) items.push({kind: 'word', word: currentWord});
  if (currentWs) items.push({kind: 'ws', chars: currentWs});
  return items;
};

const TypewriterText: FC<TypewriterTextProps> = ({
  segments,
  className,
  ariaLabel,
  charDelay = 45,
  startDelay = 0,
  showCaret = true,
  caretClassName,
  threshold = 0.2,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setTyping(true);
            io.disconnect();
          }
        });
      },
      {threshold},
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shouldReduceMotion, threshold]);

  const fullText = useMemo(() => segments.map(s => s.text).join(''), [segments]);
  const totalChars = fullText.length;
  const flow = useMemo(() => buildFlow(segments), [segments]);

  // Single caret driven by JS state — reliable across mobile browsers.
  // caretIndex is the char index the caret sits *before* (0..totalChars).
  const [caretIndex, setCaretIndex] = useState(0);
  useEffect(() => {
    if (!typing || shouldReduceMotion) return;
    setCaretIndex(0);
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i <= totalChars; i += 1) {
      timeouts.push(
        setTimeout(() => setCaretIndex(i), startDelay + i * charDelay),
      );
    }
    return () => timeouts.forEach(clearTimeout);
  }, [typing, shouldReduceMotion, totalChars, charDelay, startDelay]);

  const caretIsFinal = caretIndex >= totalChars;
  const renderCaret = (key: string) =>
    showCaret ? (
      <span
        aria-hidden="true"
        className={cn('typewriter-caret', caretClassName)}
        data-final={caretIsFinal ? 'true' : 'false'}
        key={key}
      />
    ) : null;

  if (shouldReduceMotion) {
    return (
      <span aria-label={ariaLabel ?? fullText} className={className}>
        {segments.map((seg, i) => (
          <span className={seg.className} key={i}>
            {seg.text}
          </span>
        ))}
      </span>
    );
  }

  const renderChar = (tok: Token) => {
    const charAppearDelay = startDelay + tok.charIndex * charDelay;
    return (
      <Fragment key={`c-${tok.charIndex}`}>
        {caretIndex === tok.charIndex ? renderCaret(`caret-${tok.charIndex}`) : null}
        <span
          className="typewriter-char"
          style={{'--typewriter-delay': `${charAppearDelay}ms`} as CSSProperties}>
          {tok.char}
        </span>
      </Fragment>
    );
  };

  return (
    <span
      aria-label={ariaLabel ?? fullText}
      className={className}
      data-typing={typing ? 'true' : 'false'}
      ref={ref}>
      {flow.map((item, idx) => {
        if (item.kind === 'ws') {
          return (
            <Fragment key={`ws-${idx}`}>
              {item.chars.map(tok => (
                <span aria-hidden="true" className={segments[tok.segmentIndex].className} key={`wswrap-${tok.charIndex}`}>
                  {renderChar(tok)}
                </span>
              ))}
            </Fragment>
          );
        }
        const seg = segments[item.word.segmentIndex];
        return (
          <span aria-hidden="true" className={cn('typewriter-word', seg.className)} key={`w-${idx}`}>
            {item.word.chars.map(tok => renderChar(tok))}
          </span>
        );
      })}
      {caretIsFinal ? renderCaret('caret-final') : null}
    </span>
  );
};

TypewriterText.displayName = 'TypewriterText';

export default TypewriterText;
