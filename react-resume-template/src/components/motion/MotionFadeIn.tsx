import {motion, useReducedMotion} from 'framer-motion';
import {FC, ReactNode} from 'react';

interface MotionFadeInProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

const MotionFadeIn: FC<MotionFadeInProps> = ({children, delay, y, className}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{opacity: 0, y: y ?? 16}}
      transition={{duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: delay ?? 0}}
      viewport={{once: true, margin: '-80px'}}
      whileInView={{opacity: 1, y: 0}}>
      {children}
    </motion.div>
  );
};

MotionFadeIn.displayName = 'MotionFadeIn';

export default MotionFadeIn;
