import {FC} from 'react';

import {Badge} from '@/components/ui/badge';
import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip';

import ExpertiseTile from '../ExpertiseTile';

interface StackItem {
  name: string;
  years: number;
}

interface CapabilityGroup {
  capability: string;
  items: StackItem[];
}

// MOCK — replace with real data source
const GROUPS: readonly CapabilityGroup[] = [
  {
    capability: 'Ship UIs fast',
    items: [
      {name: 'React', years: 9},
      {name: 'Next.js', years: 6},
      {name: 'Tailwind', years: 4},
      {name: 'Shadcn', years: 2},
      {name: 'Framer Motion', years: 3},
    ],
  },
  {
    capability: 'Move data safely',
    items: [
      {name: 'TypeScript', years: 8},
      {name: 'Zod', years: 3},
      {name: 'tRPC', years: 2},
      {name: 'Sanity', years: 3},
      {name: 'PostgreSQL', years: 6},
    ],
  },
  {
    capability: 'Operate in production',
    items: [
      {name: 'Vercel', years: 5},
      {name: 'AWS Lambda', years: 4},
      {name: 'Playwright', years: 3},
      {name: 'GitHub Actions', years: 5},
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
              {group.items.map(item => (
                <li key={item.name}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge className={CHIP_CLASSES} variant="secondary">
                        {item.name}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      {item.years} {item.years === 1 ? 'year' : 'years'}
                    </TooltipContent>
                  </Tooltip>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </ExpertiseTile>
  );
};

StackConstellationTile.displayName = 'StackConstellationTile';

export default StackConstellationTile;
