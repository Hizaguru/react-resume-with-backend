'use client';

import {useReducedMotion} from 'framer-motion';
import {FC, useEffect, useMemo, useRef, useState} from 'react';

export type TerminalLine = string | {prefix?: string; text: string};

export interface TypingTerminalProps {
  lines: TerminalLine[];
  /** Typing speed (characters per second). Default ~55. */
  charsPerSecond?: number;
  /** Delay before the first character is typed, in seconds. */
  startDelay?: number;
  /** Pause between lines, in seconds. */
  lineDelay?: number;
  /** Gate start until parent decides (e.g. in-view). */
  start?: boolean;
  onComplete?: () => void;
  className?: string;
}

const PHOSPHOR_FG = '#c4b5fd';
const PHOSPHOR_DIM = '#a78bfa';

const normalize = (line: TerminalLine): {prefix: string; text: string} =>
  typeof line === 'string' ? {prefix: '', text: line} : {prefix: line.prefix ?? '', text: line.text};

const TypingTerminal: FC<TypingTerminalProps> = ({
  lines,
  charsPerSecond = 55,
  startDelay = 0.2,
  lineDelay = 0.25,
  start = true,
  onComplete,
  className,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const normalized = useMemo(() => lines.map(normalize), [lines]);

  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const instant = shouldReduceMotion;
  const typing = start && !instant;

  // Reset typing state to the start whenever `start` is off (or lines change)
  // so that a false→true flip begins from an empty terminal rather than
  // resuming mid-way.
  useEffect(() => {
    if (!typing) {
      setLineIndex(0);
      setCharIndex(0);
      setDone(false);
    }
  }, [typing, normalized]);

  useEffect(() => {
    if (!typing) return;

    const perChar = 1000 / charsPerSecond;
    const current = normalized[lineIndex];
    if (!current) return;

    if (charIndex === 0 && lineIndex === 0) {
      timeoutRef.current = setTimeout(() => setCharIndex(1), startDelay * 1000);
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }

    if (charIndex < current.text.length) {
      timeoutRef.current = setTimeout(() => setCharIndex(c => c + 1), perChar);
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }

    if (lineIndex < normalized.length - 1) {
      timeoutRef.current = setTimeout(() => {
        setLineIndex(i => i + 1);
        setCharIndex(0);
      }, lineDelay * 1000);
    } else if (!done) {
      setDone(true);
      onCompleteRef.current?.();
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [charIndex, lineIndex, normalized, charsPerSecond, lineDelay, startDelay, typing, done]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const screenReaderText = normalized.map(({prefix, text}) => (prefix ? `${prefix} ${text}` : text)).join('\n');

  type VisibleLine = {prefix: string; text: string; typed: string; isCurrent: boolean};
  const visibleLines: VisibleLine[] = instant
    ? normalized.map((line, i) => ({...line, typed: line.text, isCurrent: i === normalized.length - 1}))
    : typing
      ? normalized.slice(0, lineIndex + 1).map((line, i) => ({
          ...line,
          typed: i === lineIndex ? line.text.slice(0, charIndex) : line.text,
          isCurrent: i === lineIndex,
        }))
      : [];

  const showPlaceholderCursor = !instant && !typing;

  return (
    <div className={['font-mono text-[13px] sm:text-sm leading-relaxed', className].filter(Boolean).join(' ')}>
      <span className="sr-only">{screenReaderText}</span>
      <div aria-hidden="true" className="whitespace-pre-wrap break-words">
        {visibleLines.map((line, i) => {
          const showCursor = instant
            ? i === visibleLines.length - 1
            : line.isCurrent || (done && i === visibleLines.length - 1);
          return (
            <div className="flex" key={i}>
              {line.prefix ? (
                <span className="shrink-0 whitespace-pre" style={{color: PHOSPHOR_DIM, opacity: 0.6}}>
                  {line.prefix}
                </span>
              ) : null}
              <span style={{color: PHOSPHOR_FG, textShadow: '0 0 6px rgba(168, 85, 247, 0.55)'}}>
                {line.typed}
                {showCursor ? <span className="terminal-cursor">▌</span> : null}
              </span>
            </div>
          );
        })}
        {showPlaceholderCursor ? (
          <div className="flex">
            <span style={{color: PHOSPHOR_FG, textShadow: '0 0 6px rgba(168, 85, 247, 0.55)'}}>
              <span className="terminal-cursor">▌</span>
            </span>
          </div>
        ) : null}
      </div>
      <style jsx>{`
        .terminal-cursor {
          display: inline-block;
          margin-left: 1px;
          animation: terminal-blink 1s steps(2, start) infinite;
        }
        @keyframes terminal-blink {
          to {
            visibility: hidden;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .terminal-cursor {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

TypingTerminal.displayName = 'TypingTerminal';

export default TypingTerminal;
export {TypingTerminal};
