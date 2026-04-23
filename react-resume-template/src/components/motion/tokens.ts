import type {Easing, TargetAndTransition, Variants, Transition} from 'framer-motion';

/**
 * Central motion design tokens.
 *
 * Single source of truth for the site's animation language. Edit these to
 * tune the entire experience from one place.
 *
 * Guiding principles:
 *  - Animate ONLY hardware-accelerated properties: `transform` and `opacity`.
 *  - Keep durations short (180–700ms). Long, slow animations feel sluggish.
 *  - One easing curve everywhere = visual cohesion ("luxury" feel).
 *  - Always respect `prefers-reduced-motion` (handled inside the components).
 */

// ─── Easings ────────────────────────────────────────────────────────────────
// `easeOutExpo`-flavoured cubic-bezier — snappy in, soft out. Used everywhere.
export const EASE_OUT: Easing = [0.22, 1, 0.36, 1];
// Symmetrical ease for ambient/looping motion (gradient drift, parallax).
export const EASE_IN_OUT: Easing = [0.65, 0, 0.35, 1];

// ─── Durations (seconds) ────────────────────────────────────────────────────
export const DURATION = {
  fast: 0.18,
  base: 0.45,
  slow: 0.7,
} as const;

// ─── Distances (pixels, for translate effects) ──────────────────────────────
export const DISTANCE = {
  sm: 8,
  md: 16,
  lg: 32,
} as const;

// ─── Stagger timings ────────────────────────────────────────────────────────
export const STAGGER = {
  /** Tight stagger for closely-related elements (chips, tags). */
  tight: 0.04,
  /** Default stagger for cards/list items. */
  base: 0.08,
  /** Roomy stagger for hero entrances. */
  loose: 0.12,
} as const;

// ─── Viewport defaults for whileInView ──────────────────────────────────────
/**
 * Trigger reveals slightly before they enter the viewport, only once.
 * Using `amount: 'some'` (= 0) means animations start the moment the element's
 * top crosses the bottom margin → no perceived "jump" near the fold.
 */
export const VIEWPORT_DEFAULT = {once: true, margin: '-80px 0px -80px 0px', amount: 'some'} as const;

// ─── Reusable variants ──────────────────────────────────────────────────────

const baseTransition: Transition = {duration: DURATION.base, ease: EASE_OUT};

type Direction = 'up' | 'down' | 'left' | 'right';

const vec = (direction: Direction, distance: number): {x: number; y: number} => {
  switch (direction) {
    case 'up':
      return {x: 0, y: distance};
    case 'down':
      return {x: 0, y: -distance};
    case 'left':
      return {x: distance, y: 0};
    case 'right':
      return {x: -distance, y: 0};
  }
};

/** Build a fade + translate variant pair on the fly. */
export const buildFade = (direction: Direction = 'up', distance: number = DISTANCE.md): Variants => {
  const offset = vec(direction, distance);
  return {
    hidden: {opacity: 0, x: offset.x, y: offset.y},
    visible: {opacity: 1, x: 0, y: 0, transition: baseTransition} as TargetAndTransition,
  };
};

/** Soft scale + fade — for portraits, key images, hero CTAs. */
export const buildScale = (from: number = 0.96): Variants => ({
  hidden: {opacity: 0, scale: from},
  visible: {opacity: 1, scale: 1, transition: baseTransition} as TargetAndTransition,
});

/** Parent variant that triggers staggered reveal of children. */
export const buildStagger = (
  staggerChildren: number = STAGGER.base,
  delayChildren: number = 0,
): Variants => ({
  hidden: {},
  visible: {
    transition: {staggerChildren, delayChildren} as Transition,
  },
});

// Pre-built common variants for quick consumption.
export const fadeUp = buildFade('up', DISTANCE.md);
export const fadeUpSmall = buildFade('up', DISTANCE.sm);
export const fadeDown = buildFade('down', DISTANCE.sm);
export const scaleIn = buildScale(0.96);
export const staggerParent = buildStagger(STAGGER.base);
