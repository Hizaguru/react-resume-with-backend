import {FC} from 'react';

import {Badge} from '@/components/ui/badge';
import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip';

import ExpertiseTile from '../ExpertiseTile';

interface StackItem {
  name: string;
  since: Date;
}

interface CapabilityGroup {
  capability: string;
  items: StackItem[];
}

const SHIPPING_SINCE = new Date('2022-05-01T00:00:00Z');

const yearsSince = (from: Date): number => {
  const diffMs = Date.now() - from.getTime();
  const years = diffMs / (1000 * 60 * 60 * 24 * 365.25);
  return Math.max(0, Math.round(years));
};

const GROUPS: readonly CapabilityGroup[] = [
  {
    capability: 'Ship UIs fast',
    items: [
      {name: 'React', since: SHIPPING_SINCE},
      {name: 'Electron', since: SHIPPING_SINCE},
      {name: 'Unreal Engine', since: SHIPPING_SINCE},
      {name: 'Next.js', since: SHIPPING_SINCE},
      {name: 'Tailwind', since: SHIPPING_SINCE},
    ],
  },
  {
    capability: 'Move data safely',
    items: [
      {name: 'TypeScript', since: SHIPPING_SINCE},
      {name: 'MongoDB', since: SHIPPING_SINCE},
      {name: 'GraphQL', since: SHIPPING_SINCE},
      {name: 'Sanity', since: SHIPPING_SINCE},
      {name: 'PostgreSQL', since: SHIPPING_SINCE},
    ],
  },
  {
    capability: 'Operate in production',
    items: [
      {name: 'Vercel', since: SHIPPING_SINCE},
      {name: 'AWS Lambda', since: SHIPPING_SINCE},
      {name: 'Playwright', since: SHIPPING_SINCE},
      {name: 'Vitest', since: SHIPPING_SINCE},
      {name: 'Docker', since: SHIPPING_SINCE},
      {name: 'GitHub Actions', since: SHIPPING_SINCE},
    ],
  },
] as const;

const CHIP_CLASSES =
  'font-mono text-xs px-2.5 py-1 rounded-full bg-muted text-foreground border border-border hover:bg-primary/10 hover:text-primary hover:border-primary/40 transition-colors';

const StackConstellationTile: FC = () => {
  return (
    <ExpertiseTile eyebrow="Stack" title="A constellation, not a checklist.">
      <div className="flex flex-col gap-6">
        {GROUPS.map(group => (
          <div key={group.capability}>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{group.capability}</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {group.items.map(item => {
                const years = yearsSince(item.since);
                return (
                  <li key={item.name}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge className={CHIP_CLASSES} variant="secondary">
                          {item.name}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        {years} {years === 1 ? 'year' : 'years'}
                      </TooltipContent>
                    </Tooltip>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </ExpertiseTile>
  );
};

StackConstellationTile.displayName = 'StackConstellationTile';

export default StackConstellationTile;
