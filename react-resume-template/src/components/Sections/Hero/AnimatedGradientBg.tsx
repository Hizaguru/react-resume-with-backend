import {motion, useReducedMotion} from 'framer-motion';
import Image from 'next/image';
import {FC} from 'react';

const AnimatedGradientBg: FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-0 overflow-hidden">
      {/* Photo background */}
      <Image
        alt=""
        className="object-cover"
        fill
        priority
        sizes="100vw"
        src="/images/header_img.png"
      />

      {/* Dark gradient overlay — improves text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/70" />

      {/* Subtle violet tint to match the brand palette */}
      <div className="absolute inset-0 bg-violet-900/15 mix-blend-overlay" />

      {/* Floating mist layers */}
      {shouldReduceMotion ? (
        <>
          <div className="absolute left-[-10%] top-[55%] h-[40vmax] w-[70vmax] rounded-full bg-white/25 blur-3xl" />
          <div className="absolute right-[-15%] top-[35%] h-[35vmax] w-[60vmax] rounded-full bg-white/15 blur-3xl" />
        </>
      ) : (
        <>
          <motion.div
            animate={{x: ['-5%', '8%', '-5%'], y: ['0%', '-3%', '0%'], opacity: [0.25, 0.4, 0.25]}}
            className="absolute left-[-10%] top-[55%] h-[40vmax] w-[70vmax] rounded-full bg-white/25 blur-3xl"
            transition={{duration: 22, repeat: Infinity, ease: 'easeInOut'}}
          />
          <motion.div
            animate={{x: ['5%', '-6%', '5%'], y: ['0%', '4%', '0%'], opacity: [0.15, 0.3, 0.15]}}
            className="absolute right-[-15%] top-[35%] h-[35vmax] w-[60vmax] rounded-full bg-white/15 blur-3xl"
            transition={{duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 2}}
          />
          <motion.div
            animate={{x: ['0%', '10%', '0%'], y: ['10%', '0%', '10%'], opacity: [0.1, 0.22, 0.1]}}
            className="absolute left-[20%] bottom-[-10%] h-[30vmax] w-[50vmax] rounded-full bg-slate-200/20 blur-3xl"
            transition={{duration: 34, repeat: Infinity, ease: 'easeInOut', delay: 4}}
          />
        </>
      )}

      {/* Film grain */}
      <div className="absolute inset-0 bg-noise opacity-[0.05] mix-blend-overlay pointer-events-none" />
    </div>
  );
};

AnimatedGradientBg.displayName = 'AnimatedGradientBg';

export default AnimatedGradientBg;
