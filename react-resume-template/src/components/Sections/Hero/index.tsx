import { motion, useReducedMotion } from 'framer-motion';
import { FC, memo } from 'react';

// NOTE: The previous Hero pulled a `header` image from Sanity via `client.fetch`.
// The new design uses a generated animated gradient background instead, so that
// integration is deprecated here. Keep the Sanity `header` schema in the CMS
// until we decide whether to reuse it elsewhere.
// import {client, urlFor} from '../../../client';

import { SectionId } from '../../../data/data';
import { EASE_OUT, STAGGER } from '../../motion/tokens';

import AnimatedGradientBg from './AnimatedGradientBg';
import HeroCTA from './HeroCTA';
import HeroHeadline from './HeroHeadline';

const Hero: FC = memo(() => {
  const shouldReduceMotion = useReducedMotion();

  // Layered entrance: orchestrate headline -> CTA on first paint (not scroll-
  // triggered, since hero is above the fold). Stagger handled by parent variants.
  const parent = shouldReduceMotion
    ? undefined
    : {hidden: {}, visible: {transition: {staggerChildren: STAGGER.loose, delayChildren: 0.15}}};
  const child = shouldReduceMotion
    ? undefined
    : {
        hidden: {opacity: 0, y: 24},
        visible: {opacity: 1, y: 0, transition: {duration: 0.7, ease: EASE_OUT}},
      };

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] w-full max-w-none items-center justify-center overflow-hidden bg-background"
      id={SectionId.Hero}>
      <AnimatedGradientBg />
      <motion.div
        animate="visible"
        className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 text-center"
        initial={shouldReduceMotion ? false : 'hidden'}
        variants={parent}>
        <motion.div id="hero-heading" variants={child}>
          <HeroHeadline />
        </motion.div>
        <motion.div variants={child}>
          <HeroCTA />
        </motion.div>
      </motion.div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
