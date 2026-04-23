import {motion, useReducedMotion, type Variants} from 'framer-motion';
import {FC, ReactNode} from 'react';

import {buildFade, buildScale, DISTANCE, EASE_OUT, VIEWPORT_DEFAULT} from './tokens';

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale' | 'none';

export interface RevealProps {
  children: ReactNode;
  /** Animation direction. `scale` = soft zoom-in. `none` = opacity only. */
  direction?: Direction;
  /** Translate distance in px (ignored for `scale`/`none`). */
  distance?: number;
  /** Initial scale (only used when direction is `scale`). */
  fromScale?: number;
  /** Delay in seconds before the reveal starts. */
  delay?: number;
  /** Duration in seconds. */
  duration?: number;
  /** When false, re-animates every time it enters the viewport. */
  once?: boolean;
  /** `as` element type for the wrapper. */
  as?: 'div' | 'span' | 'li' | 'section';
  className?: string;
}

/**
 * Single-element scroll reveal. Replaces ad-hoc `MotionFadeIn` use sites with
 * a richer API (direction, distance, scale).
 *
 * - Animates only `transform` + `opacity` → no layout shift.
 * - Respects `prefers-reduced-motion` → renders children inline with no anim.
 * - Uses the shared `EASE_OUT` curve and viewport defaults from `tokens`.
 */
const Reveal: FC<RevealProps> = ({
  children,
  direction = 'up',
  distance = DISTANCE.md,
  fromScale = 0.96,
  delay = 0,
  duration,
  once = true,
  as = 'div',
  className,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  let variants: Variants;
  if (direction === 'scale') {
    variants = buildScale(fromScale);
  } else if (direction === 'none') {
    variants = {hidden: {opacity: 0}, visible: {opacity: 1}};
  } else {
    variants = buildFade(direction, distance);
  }

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      transition={duration !== undefined ? {duration, ease: EASE_OUT, delay} : {delay, ease: EASE_OUT}}
      variants={variants}
      viewport={{...VIEWPORT_DEFAULT, once}}
      whileInView="visible">
      {children}
    </MotionTag>
  );
};

Reveal.displayName = 'Reveal';

export default Reveal;
