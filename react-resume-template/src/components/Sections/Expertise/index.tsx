import {FC, memo} from 'react';

import Reveal from '../../motion/Reveal';
import {StaggerGroup, StaggerItem} from '../../motion/Stagger';

import ImpactMetricsTile from './tiles/ImpactMetricsTile';
import NowBuildingTile from './tiles/NowBuildingTile';
import SkillsGridTile from './tiles/SkillsGridTile';

const Expertise: FC = memo(() => {
  return (
    <section className="bg-background py-24 sm:py-32 lg:py-40" id="expertise">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">What I bring</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            Expertise, not a checklist.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            A few things I&apos;ve learned from nearly a decade of shipping products people actually use.
          </p>
        </Reveal>
        <StaggerGroup
          className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)] mt-12"
          stagger={0.1}>
          <StaggerItem className="md:col-span-2 flex">
            <ImpactMetricsTile />
          </StaggerItem>
          <StaggerItem className="md:col-span-1 flex">
            <NowBuildingTile />
          </StaggerItem>
          <StaggerItem className="md:col-span-3 flex">
            <SkillsGridTile />
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
});

Expertise.displayName = 'Expertise';

export default Expertise;
