import {FC} from 'react';

import ExpertiseTile from '../ExpertiseTile';

const NowBuildingTile: FC = () => {
  return (
    <ExpertiseTile eyebrow="Now" title="Currently building">
      <div className="flex items-start gap-3">
        <span className="relative mt-1.5 flex h-2.5 w-2.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
        </span>
        {/* MOCK — replace with real data source */}
        <p className="text-base text-foreground">An AI-assisted resume editor in Next.js 16, shipping weekly.</p>
      </div>
    </ExpertiseTile>
  );
};

NowBuildingTile.displayName = 'NowBuildingTile';

export default NowBuildingTile;
