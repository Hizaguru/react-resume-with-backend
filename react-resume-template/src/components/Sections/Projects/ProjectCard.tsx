import Image from 'next/image';
import React, {FC, memo} from 'react';

import {Badge} from '@/components/ui/badge';
import {Card, CardContent} from '@/components/ui/card';

import {urlFor} from '../../../client';
import {PortfolioItem} from '../../../data/dataDef';
import HoverLift from '../../motion/HoverLift';

interface ProjectCardProps {
  item: PortfolioItem;
  onSelect?: (item: PortfolioItem) => void;
}

const extractTags = (description: string | undefined): string[] => {
  if (!description) return [];
  return description
    .split(/[\n,|]/)
    .map(t => t.trim())
    .filter(Boolean)
    .slice(0, 4);
};

const CHIP_CLASSES =
  'font-mono text-xs px-2.5 py-1 rounded-full bg-muted text-foreground border border-border hover:bg-primary/10 hover:text-primary hover:border-primary/40 transition-colors';

const ProjectCard: FC<ProjectCardProps> = memo(({item, onSelect}) => {
  const {title, description, imgUrl} = item;
  // MOCK — Sanity schema has no `outcome` field yet; using description as placeholder.
  const outcome = description?.split('\n')[0] ?? '';
  const tags = extractTags(description);
  const src = typeof imgUrl === 'string' ? imgUrl : urlFor(imgUrl).width(800).height(500).url();

  const handleClick = (): void => {
    onSelect?.(item);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (!onSelect) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(item);
    }
  };

  const interactive = Boolean(onSelect);

  return (
    <HoverLift className="h-full">
      <Card
        aria-label={interactive ? `Open details for ${title}` : undefined}
        className={`group relative overflow-hidden rounded-2xl border-border bg-card p-0 transition-shadow duration-300 hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_18px_40px_-18px_rgba(124,58,237,0.45)] focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2${interactive ? ' cursor-pointer' : ''}`}
        onClick={interactive ? handleClick : undefined}
        onKeyDown={interactive ? handleKeyDown : undefined}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}>
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            alt={title}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            src={src}
          />
        </div>
        <CardContent className="flex flex-col gap-3 p-5">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">{title}</h3>
          {outcome ? <p className="line-clamp-2 text-sm text-muted-foreground">{outcome}</p> : null}
          {tags.length > 0 ? (
            <ul className="mt-1 flex flex-wrap gap-2">
              {tags.map(tag => (
                <li key={tag}>
                  <Badge className={CHIP_CLASSES} variant="secondary">
                    {tag}
                  </Badge>
                </li>
              ))}
            </ul>
          ) : null}
        </CardContent>
      </Card>
    </HoverLift>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
