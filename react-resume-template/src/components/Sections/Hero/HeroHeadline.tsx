import {AnimatePresence, motion, useReducedMotion} from 'framer-motion';
import {FC, useEffect, useState} from 'react';

const ROLES: readonly string[] = ['ships products', 'writes clean TS', 'obsesses over UX'] as const;

const HeroHeadline: FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = globalThis.setInterval(() => {
      setRoleIndex(i => (i + 1) % ROLES.length);
    }, 2800);
    return () => globalThis.clearInterval(id);
  }, [shouldReduceMotion]);

  const currentRole = ROLES[roleIndex];

  return (
    <>
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-violet-300 drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
        Full-stack engineer · Nurmijärvi
      </p>
      <h1 className="mt-4 text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)]">
        <span className="text-zinc-200">Hi, I&apos;m</span>{' '}
        <span className="text-violet-300 bg-gradient-to-br from-violet-300 via-violet-200 to-white bg-clip-text text-transparent">
          Jukkis
        </span>
        .
      </h1>
      <p className="mt-6 text-lg text-zinc-200/90 max-w-xl mx-auto drop-shadow-[0_1px_10px_rgba(0,0,0,0.5)]">
        A full-stack engineer who{' '}
        {shouldReduceMotion ? (
          <span className="font-medium text-white">{ROLES[0]}</span>
        ) : (
          <span className="inline-block min-w-[10ch] text-left align-baseline">
            <AnimatePresence mode="wait">
              <motion.span
                animate={{opacity: 1, y: 0}}
                className="inline-block font-medium text-white"
                exit={{opacity: 0, y: -8}}
                initial={{opacity: 0, y: 8}}
                key={currentRole}
                transition={{duration: 0.35, ease: [0.22, 1, 0.36, 1]}}>
                {currentRole}
              </motion.span>
            </AnimatePresence>
          </span>
        )}
        .
      </p>
    </>
  );
};

HeroHeadline.displayName = 'HeroHeadline';

export default HeroHeadline;
