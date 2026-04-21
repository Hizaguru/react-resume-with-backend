import {useReducedMotion} from 'framer-motion';
import {FC, MouseEvent, ReactNode, useCallback, useRef, useState} from 'react';

import {Button, buttonVariants} from '@/components/ui/button';
import {cn} from '@/lib/utils';

type ButtonVariantProps = Parameters<typeof buttonVariants>[0];

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariantProps extends undefined ? never : NonNullable<ButtonVariantProps>['variant'];
  size?: ButtonVariantProps extends undefined ? never : NonNullable<ButtonVariantProps>['size'];
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}

const clamp = (v: number, min: number, max: number): number => Math.max(min, Math.min(max, v));

const MagneticButton: FC<MagneticButtonProps> = ({
  children,
  href,
  onClick,
  variant = 'default',
  size = 'default',
  className,
  type = 'button',
  ariaLabel,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [offset, setOffset] = useState<{x: number; y: number}>({x: 0, y: 0});

  const handleMove = useCallback(
    (e: MouseEvent<HTMLSpanElement>) => {
      if (shouldReduceMotion) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      setOffset({x: clamp(relX * 0.2, -8, 8), y: clamp(relY * 0.2, -8, 8)});
    },
    [shouldReduceMotion],
  );

  const handleLeave = useCallback(() => setOffset({x: 0, y: 0}), []);

  const style = shouldReduceMotion
    ? undefined
    : {transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`, transition: 'transform 160ms ease-out'};

  return (
    <span
      className="inline-block"
      onMouseLeave={handleLeave}
      onMouseMove={handleMove}
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions -- mouse tracking is progressive enhancement; child Button remains keyboard accessible
      ref={ref}
      style={style}>
      {href ? (
        <Button asChild className={className} size={size} variant={variant}>
          <a aria-label={ariaLabel} href={href}>
            {children}
          </a>
        </Button>
      ) : (
        <Button
          aria-label={ariaLabel}
          className={cn(className)}
          onClick={onClick}
          size={size}
          type={type}
          variant={variant}>
          {children}
        </Button>
      )}
    </span>
  );
};

MagneticButton.displayName = 'MagneticButton';

export default MagneticButton;
