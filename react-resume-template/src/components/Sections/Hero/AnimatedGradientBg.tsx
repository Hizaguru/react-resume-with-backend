import {motion, useReducedMotion} from 'framer-motion';
import {FC} from 'react';

const AnimatedGradientBg: FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const glowClass =
    'absolute left-1/2 top-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/20 blur-3xl';

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-0 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-grid-subtle opacity-60" />
      {shouldReduceMotion ? (
        <div className={glowClass} />
      ) : (
        <motion.div
          animate={{scale: [1, 1.05, 1], opacity: [0.5, 0.7, 0.5]}}
          className={glowClass}
          transition={{duration: 8, repeat: Infinity, ease: 'easeInOut'}}
        />
      )}
      <div className="absolute inset-0 bg-noise opacity-[0.04] mix-blend-overlay pointer-events-none" />
    </div>
  );
};

AnimatedGradientBg.displayName = 'AnimatedGradientBg';

export default AnimatedGradientBg;
