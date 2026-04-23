import {motion, useReducedMotion, type Variants} from 'framer-motion';
import {FC, ReactNode} from 'react';

import {buildFade, buildScale, DISTANCE, STAGGER, VIEWPORT_DEFAULT} from './tokens';

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale' | 'none';

interface StaggerGroupProps {
  children: ReactNode;
  /** Time between each child's entrance, in seconds. */
  stagger?: number;
  /** Delay before the first child starts animating, in seconds. */
  delayChildren?: number;
  /** Re-animate every time the container enters the viewport. */
  once?: boolean;
  as?: 'div' | 'ul' | 'ol' | 'section' | 'dl';
  className?: string;
}

/**
 * Parent container that orchestrates a staggered reveal of `<StaggerItem>`
 * children. Triggers when scrolled into view.
 */
export const StaggerGroup: FC<StaggerGroupProps> = ({
  children,
  stagger = STAGGER.base,
  delayChildren = 0,
  once = true,
  as = 'div',
  className,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const parentVariants: Variants = {
    hidden: {},
    visible: {transition: {staggerChildren: stagger, delayChildren}},
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      variants={parentVariants}
      viewport={{...VIEWPORT_DEFAULT, once}}
      whileInView="visible">
      {children}
    </MotionTag>
  );
};

StaggerGroup.displayName = 'StaggerGroup';

interface StaggerItemProps {
  children: ReactNode;
  direction?: Direction;
  distance?: number;
  fromScale?: number;
  as?: 'div' | 'li' | 'span' | 'section';
  className?: string;
}

/**
 * Child of `<StaggerGroup>`. Inherits its parent's stagger orchestration —
 * do not set `initial`/`whileInView` here.
 */
export const StaggerItem: FC<StaggerItemProps> = ({
  children,
  direction = 'up',
  distance = DISTANCE.md,
  fromScale = 0.96,
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
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  );
};

StaggerItem.displayName = 'StaggerItem';
