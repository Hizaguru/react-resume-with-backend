import {motion, useReducedMotion} from 'framer-motion';
import {FC, ReactNode} from 'react';

import {DISTANCE, DURATION, EASE_OUT, VIEWPORT_DEFAULT} from './tokens';

interface MotionFadeInProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

/**
 * Backwards-compatible single-element fade-up. New code should prefer
 * `<Reveal>` from `./Reveal` for richer options. Kept here so existing call
 * sites continue to work, but routed through the central motion tokens for
 * consistent timing/easing.
 */
const MotionFadeIn: FC<MotionFadeInProps> = ({children, delay, y, className}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{opacity: 0, y: y ?? DISTANCE.md}}
      transition={{duration: DURATION.base, ease: EASE_OUT, delay: delay ?? 0}}
      viewport={VIEWPORT_DEFAULT}
      whileInView={{opacity: 1, y: 0}}>
      {children}
    </motion.div>
  );
};

MotionFadeIn.displayName = 'MotionFadeIn';

export default MotionFadeIn;
