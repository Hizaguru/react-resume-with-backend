import {motion, useReducedMotion, useScroll, useTransform} from 'framer-motion';
import {FC, ReactNode, useRef} from 'react';

interface ParallaxProps {
  children: ReactNode;
  /**
   * Maximum vertical offset (in px) applied across the element's scroll range.
   * Positive = element moves slower than the page (drifts up as you scroll
   * past). Negative inverts the direction.
   */
  offset?: number;
  /** When true, also scale slightly (1 → 1.06) for a layered depth feel. */
  withScale?: boolean;
  className?: string;
}

/**
 * Scroll-linked parallax wrapper. Uses `useScroll` with the element as the
 * target so the transform is bound to the element's own scroll progress, not
 * page scroll — much smoother and avoids jank in long pages.
 *
 * Renders a passive `<div>` (no semantic meaning) so it doesn't interfere
 * with the surrounding layout. Only `transform` is animated.
 *
 * Disabled entirely under `prefers-reduced-motion`.
 */
const Parallax: FC<ParallaxProps> = ({children, offset = 60, withScale = false, className}) => {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Hooks must be called unconditionally — values are simply ignored when
  // reduced motion is preferred.
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.04, 1]);

  if (shouldReduceMotion) {
    return (
      <div className={className} ref={ref}>
        {children}
      </div>
    );
  }

  return (
    <motion.div className={className} ref={ref} style={{y, scale: withScale ? scale : undefined}}>
      {children}
    </motion.div>
  );
};

Parallax.displayName = 'Parallax';

export default Parallax;
