import {FC, memo} from 'react';

import MotionFadeIn from '../../motion/MotionFadeIn';

import ImpactMetricsTile from './tiles/ImpactMetricsTile';
import NowBuildingTile from './tiles/NowBuildingTile';
import PhilosophyTile from './tiles/PhilosophyTile';
import ProjectLinkTile from './tiles/ProjectLinkTile';
import StackConstellationTile from './tiles/StackConstellationTile';

interface CellProps {
  className: string;
  delay: number;
  children: React.ReactNode;
}

const Cell: FC<CellProps> = ({className, delay, children}) => (
  <MotionFadeIn className={className} delay={delay}>
    {children}
  </MotionFadeIn>
);

const Expertise: FC = memo(() => {
  return (
    <section className="bg-background py-24 sm:py-32 lg:py-40" id="expertise">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <MotionFadeIn>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">What I bring</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            Expertise, not a checklist.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            A few things I&apos;ve learned from nearly a decade of shipping products people actually use.
          </p>
        </MotionFadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)] mt-12">
          <Cell className="md:col-span-2 lg:col-span-2 lg:row-span-1 flex" delay={0}>
            <ImpactMetricsTile />
          </Cell>
          <Cell className="md:col-span-1 lg:col-span-1 flex" delay={0.08}>
            <NowBuildingTile />
          </Cell>
          <Cell className="md:col-span-3 lg:col-span-1 lg:row-span-2 flex" delay={0.16}>
            <PhilosophyTile />
          </Cell>
          <Cell className="md:col-span-3 lg:col-span-3 flex" delay={0.24}>
            <StackConstellationTile />
          </Cell>
          <Cell className="md:col-span-3 lg:col-span-4 flex" delay={0.32}>
            <ProjectLinkTile />
          </Cell>
        </div>
      </div>
    </section>
  );
});

Expertise.displayName = 'Expertise';

export default Expertise;
