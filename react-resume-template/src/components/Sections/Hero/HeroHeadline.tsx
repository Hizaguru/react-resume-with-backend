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
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
        Full-stack engineer · Helsinki
      </p>
      <h1 className="mt-4 text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] text-foreground">
        Hi, I&apos;m{' '}
        <span className="text-violet-600 bg-gradient-to-br from-violet-600 via-violet-500 to-violet-400 bg-clip-text text-transparent">
          Jukka-Pekka
        </span>.
      </h1>
      <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
        A full-stack engineer who{' '}
        {shouldReduceMotion ? (
          <span className="font-medium text-foreground">{ROLES[0]}</span>
        ) : (
          <span className="inline-block min-w-[10ch] text-left align-baseline">
            <AnimatePresence mode="wait">
              <motion.span
                animate={{opacity: 1, y: 0}}
                className="inline-block font-medium text-foreground"
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
