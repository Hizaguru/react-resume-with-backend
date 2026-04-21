import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import { FC, useEffect, useRef, useState } from 'react';

import ExpertiseTile from '../ExpertiseTile';

const SHIPPING_SINCE = new Date('2022-05-01T00:00:00Z');

const yearsSince = (from: Date): number => {
  const now = new Date();
  const diffMs = now.getTime() - from.getTime();
  const years = diffMs / (1000 * 60 * 60 * 24 * 365.25);
  return Math.max(0, Math.round(years));
};

interface Metric {
  value: number;
  suffix: string;
  label: string;
}

const METRICS: readonly Metric[] = [
  {value: yearsSince(SHIPPING_SINCE), suffix: '', label: 'Years shipping software'},
  {value: 3, suffix: '', label: 'Features in production'},
  {value: 10000, suffix: '+', label: 'Users reached monthly'},
] as const;

interface CountProps {
  target: number;
  suffix: string;
  active: boolean;
}

const Count: FC<CountProps> = ({target, suffix, active}) => {
  const shouldReduceMotion = useReducedMotion();
  const mv = useMotionValue(shouldReduceMotion ? target : 0);
  const rounded = useTransform(mv, latest => Math.round(latest).toString());

  useEffect(() => {
    if (shouldReduceMotion) {
      mv.set(target);
      return;
    }
    if (!active) return;
    const controls = animate(mv, target, {duration: 1.4, ease: [0.22, 1, 0.36, 1]});
    return () => controls.stop();
  }, [active, mv, shouldReduceMotion, target]);

  return (
    <span className="inline-flex items-baseline tabular-nums">
      <motion.span>{rounded}</motion.span>
      <span>{suffix}</span>
    </span>
  );
};

const ImpactMetricsTile: FC = () => {
  const listRef = useRef<HTMLDListElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    // Fallback for environments without IntersectionObserver: trigger immediately.
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      {threshold: 0, rootMargin: '0px 0px -10% 0px'},
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <ExpertiseTile eyebrow="Impact" title="Numbers that matter.">
      <dl className="grid grid-cols-1 gap-6 sm:grid-cols-3" ref={listRef}>
        {METRICS.map(m => (
          <div className="flex flex-col" key={m.label}>
            <dt className="sr-only">{m.label}</dt>
            <dd className="text-4xl font-semibold tabular-nums text-violet-600 bg-gradient-to-br from-violet-600 via-violet-500 to-violet-400 bg-clip-text text-transparent sm:text-5xl">
              <Count active={inView} suffix={m.suffix} target={m.value} />
            </dd>
            <span className="mt-1 text-sm text-muted-foreground">{m.label}</span>
          </div>
        ))}
      </dl>
    </ExpertiseTile>
  );
};

ImpactMetricsTile.displayName = 'ImpactMetricsTile';

export default ImpactMetricsTile;
