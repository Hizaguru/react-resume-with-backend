import {motion, useReducedMotion} from 'framer-motion';
import {FC, ReactNode} from 'react';

import {EASE_OUT} from './tokens';

interface HoverLiftProps {
  children: ReactNode;
  /** Translate-Y on hover (px). */
  lift?: number;
  /** Scale on hover. */
  scale?: number;
  /** Tap (active) scale for tactile feedback. */
  tapScale?: number;
  className?: string;
  as?: 'div' | 'li' | 'article';
}

/**
 * Premium card hover behaviour: lifts and softly scales on hover, with a tiny
 * tap-back press. Uses spring transition for that "weight" feel.
 *
 * Apply on cards/tiles to standardise the hover language. Replaces ad-hoc
 * `hover:-translate-y-1` Tailwind utilities so timing/easing stays consistent.
 *
 * No-op under `prefers-reduced-motion`.
 */
const HoverLift: FC<HoverLiftProps> = ({
  children,
  lift = -4,
  scale = 1.012,
  tapScale = 0.99,
  className,
  as = 'div',
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      transition={{type: 'spring', stiffness: 300, damping: 24, mass: 0.7, ease: EASE_OUT}}
      whileHover={{y: lift, scale}}
      whileTap={{scale: tapScale}}>
      {children}
    </MotionTag>
  );
};

HoverLift.displayName = 'HoverLift';

export default HoverLift;
