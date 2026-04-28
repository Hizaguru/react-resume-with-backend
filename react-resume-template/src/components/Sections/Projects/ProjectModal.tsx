import Image from 'next/image';
import {FC} from 'react';

import {Badge} from '@/components/ui/badge';

import Modal from '../../Modal/Modal';
import {urlFor} from '../../../client';
import {PortfolioItem} from '../../../data/dataDef';

interface ProjectModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

const CHIP_CLASSES = 'font-mono text-xs px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200';

const extractTags = (description: string | undefined): string[] => {
  if (!description) return [];
  return description
    .split(/[\n,|]/)
    .map(t => t.trim())
    .filter(Boolean)
    .slice(0, 6);
};

const resolveImage = (img: PortfolioItem['imgUrl'] | undefined): string => {
  if (!img) return '';
  if (typeof img === 'string') return img;
  if ('src' in img) return (img as {src: string}).src;
  return urlFor(img as Parameters<typeof urlFor>[0])
    .width(1600)
    .height(900)
    .url();
};

const ProjectModal: FC<ProjectModalProps> = ({item, onClose}) => {
  const isOpen = item !== null;
  const title = item?.modalTitle || item?.title || '';
  const description = item?.modalDescription || item?.description || '';
  const imgSrc = item ? resolveImage(item.modalImgUrl ?? item.imgUrl) : '';
  const tags = extractTags(item?.description);
  return (
    <Modal ariaLabel={title} handleClose={onClose} isOpen={isOpen}>
      {item ? (
        <div className="flex h-full max-h-[inherit] w-full flex-col overflow-hidden">
          <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-zinc-100">
            {imgSrc ? (
              <Image alt={title} className="object-cover" fill sizes="(max-width: 720px) 94vw, 720px" src={imgSrc} />
            ) : null}
          </div>
          <div className="flex min-h-0 flex-col gap-5 overflow-y-auto p-6 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">{title}</h2>
            {description ? (
              <p className="whitespace-pre-line text-[0.95rem] leading-relaxed text-zinc-600 sm:text-base">
                {description}
              </p>
            ) : null}
            {tags.length > 0 ? (
              <ul className="flex flex-wrap gap-2 pt-1">
                {tags.map(t => (
                  <li key={t}>
                    <Badge className={CHIP_CLASSES} variant="secondary">
                      {t}
                    </Badge>
                  </li>
                ))}
              </ul>
            ) : null}
            {(item.url || item.gitUrl) && (
              <div className="flex flex-wrap gap-3 pt-2">
                {item.url ? (
                  <a
                    className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2"
                    href={item.url}
                    rel="noreferrer"
                    target="_blank">
                    Visit live
                  </a>
                ) : null}
                {item.gitUrl ? (
                  <a
                    className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 py-2 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-50 hover:border-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2"
                    href={item.gitUrl}
                    rel="noreferrer"
                    target="_blank">
                    Source code
                  </a>
                ) : null}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div />
      )}
    </Modal>
  );
};

ProjectModal.displayName = 'ProjectModal';

export default ProjectModal;
