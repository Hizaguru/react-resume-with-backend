import {FC} from 'react';

import ExpertiseTile from '../ExpertiseTile';

const PhilosophyTile: FC = () => {
  return (
    <ExpertiseTile className="justify-between" eyebrow="Philosophy" title="How I think about the work.">
      <blockquote className="text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
        <span className="text-violet-600 bg-gradient-to-br from-violet-600 via-violet-500 to-violet-400 bg-clip-text text-transparent">
          &ldquo;I optimize for the user&apos;s next click, not my resume&apos;s next bullet.&rdquo;
        </span>
      </blockquote>
      <cite className="mt-6 block text-sm not-italic text-muted-foreground">&mdash; my working principle</cite>
    </ExpertiseTile>
  );
};

PhilosophyTile.displayName = 'PhilosophyTile';

export default PhilosophyTile;
