import {FC, ReactNode} from 'react';

import {cn} from '@/lib/utils';

interface ExpertiseTileBaseProps {
  eyebrow?: string;
  title: string;
  className?: string;
  children: ReactNode;
}

type ExpertiseTileProps =
  | (ExpertiseTileBaseProps & {as?: 'section'; href?: never})
  | (ExpertiseTileBaseProps & {as: 'a'; href: string});

const BASE_CLASSES =
  'group relative flex w-full flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-16px_rgba(79,70,229,0.35)] focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2';

const Inner: FC<{eyebrow?: string; title: string; children: ReactNode}> = ({eyebrow, title, children}) => (
  <>
    {eyebrow ? (
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
    ) : null}
    <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">{title}</h3>
    <div className="mt-4 flex-1">{children}</div>
  </>
);

const ExpertiseTile: FC<ExpertiseTileProps> = props => {
  const {eyebrow, title, className, children} = props;
  const classes = cn(BASE_CLASSES, className);

  if (props.as === 'a') {
    return (
      <a className={classes} href={props.href}>
        <Inner eyebrow={eyebrow} title={title}>
          {children}
        </Inner>
      </a>
    );
  }

  return (
    <section className={classes}>
      <Inner eyebrow={eyebrow} title={title}>
        {children}
      </Inner>
    </section>
  );
};

ExpertiseTile.displayName = 'ExpertiseTile';

export default ExpertiseTile;
