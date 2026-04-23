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
    capability: 'Frontend',
    items: [
      {name: 'TypeScript', since: SHIPPING_SINCE},
      {name: 'JavaScript', since: SHIPPING_SINCE},
      {name: 'React', since: SHIPPING_SINCE},
      {name: 'Vite', since: SHIPPING_SINCE},
      {name: 'Tailwind CSS', since: SHIPPING_SINCE},
      {name: 'TanStack Query', since: SHIPPING_SINCE},
      {name: 'React Aria', since: SHIPPING_SINCE},
      {name: 'React Hook Form', since: SHIPPING_SINCE},
      {name: 'React Router', since: SHIPPING_SINCE},
      {name: 'GraphQL', since: SHIPPING_SINCE},
      {name: 'Contentful', since: SHIPPING_SINCE},
      {name: 'markdown-to-jsx', since: SHIPPING_SINCE},
    ],
  },
  {
    capability: 'Backend',
    items: [
      {name: 'Java', since: SHIPPING_SINCE},
      {name: 'Spring Boot', since: SHIPPING_SINCE},
    ],
  },
  {
    capability: 'Infra / Cloud / DevOps',
    items: [
      {name: 'AWS', since: SHIPPING_SINCE},
      {name: 'GitHub Actions', since: SHIPPING_SINCE},
      {name: 'CI/CD pipelines', since: SHIPPING_SINCE},
      {name: 'OIDC / IAM roles (GitHub Actions ↔ AWS)', since: SHIPPING_SINCE},
    ],
  },
  {
    capability: 'Testing / Quality',
    items: [
      {name: 'Playwright', since: SHIPPING_SINCE},
      {name: 'E2E testing', since: SHIPPING_SINCE},
      {name: 'Visual snapshot testing', since: SHIPPING_SINCE},
      {name: 'HTML / structural snapshots', since: SHIPPING_SINCE},
      {name: 'Test automation development', since: SHIPPING_SINCE},
    ],
  },
  {
    capability: 'CMS / Data / Integrations',
    items: [
      {name: 'Contentful SDK', since: SHIPPING_SINCE},
      {name: 'Rich-text rendering', since: SHIPPING_SINCE},
      {name: 'Headless CMS content models & typing', since: SHIPPING_SINCE},
    ],
  },
  {
    capability: 'Tools & Ecosystem',
    items: [
      {name: 'Jira', since: SHIPPING_SINCE},
      {name: 'Confluence', since: SHIPPING_SINCE},
      {name: 'GitHub', since: SHIPPING_SINCE},
      {name: 'Node.js / npm', since: SHIPPING_SINCE},
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
