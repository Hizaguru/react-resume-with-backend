import classNames from 'classnames';
import Image from 'next/legacy/image';
import {FC, memo, MouseEvent, useCallback, useEffect, useRef, useState} from 'react';
import {buildBlurPlaceholder, buildModalImage, client, urlFor} from '../../client';

import ExternalLinkIcon from '@heroicons/react/outline/ExternalLinkIcon';
import {isMobile} from '../../config';
import {SectionId} from '../../data/data';
import {PortfolioItem} from '../../data/dataDef';
import useDetectOutsideClick from '../../hooks/useDetectOutsideClick';
import Section from '../Layout/Section';
import Modal from '../Modal/Modal';

const sortPortfolioItems = (items: PortfolioItem[]) => {
  return [...items].sort((a, b) => {
    const dateA = new Date(a._updatedAt);
    const dateB = new Date(b._updatedAt);

    return dateB.getTime() - dateA.getTime();
  });
};

const Portfolio: FC = memo(() => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    const query = '*[_type == "portfolioItems"]';
    client.fetch(query).then(data => {
      const sortedItems = sortPortfolioItems(data);
      setPortfolioItems(sortedItems);
    });
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setSelectedItem(null);
  };

  const handleSelect = (item: PortfolioItem) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  return (
    <Section className="bg-neutral-800" sectionId={SectionId.Portfolio}>
      <div className="flex flex-col gap-y-8">
        <h2 className="self-center text-xl font-bold text-white">Check out some of my work</h2>
        <div className="w-full sm:columns-1 md:columns-2 lg:columns-2">
          {portfolioItems.map((item, index) => {
            const {title, imgUrl, _updatedAt} = item;
            return (
              <div className="pb-6" key={`${_updatedAt}`}>
                <div
                  className={classNames(
                    'relative h-max w-full overflow-hidden rounded-lg shadow-lg shadow-black/30 lg:shadow-xl',
                  )}>
                  <Image alt={title} layout="responsive" width={600} height={600} src={urlFor(imgUrl).url()} />
                  <ItemOverlay
                    item={portfolioItems[index]}
                    onItemSelect={() => {
                      handleSelect(item);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedItem ? (
        <Modal isOpen={isOpen} handleClose={handleClose}>
          <div className="modal-objects">
            <div className="nextJsImage relative z-0">
              <Image
                src={buildModalImage(selectedItem.modalImgUrl!).url()}
                alt={selectedItem.title}
                layout="responsive"
                width={900}
                height={600}
                placeholder="blur"
                blurDataURL={buildBlurPlaceholder(selectedItem.modalImgUrl!).url()}
                className="object-cover rounded-md z-0"
                priority
                decoding="async"
              />
            </div>

            <div className="modal-header">{selectedItem.modalTitle}</div>
            <div className="modal-description">{selectedItem.modalDescription}</div>
            {selectedItem.description && (
              <div className="tech-tags-wrapper">
                <div className="tech-tags-label">Technologies:</div>
                <ul className="tech-tags" aria-label="Technologies used">
                  {selectedItem.description
                    .split(/[\n,|]/)
                    .map(t => t.trim())
                    .filter(Boolean)
                    .map(tag => (
                      <li key={tag} className="tech-tag">
                        {tag}
                      </li>
                    ))}
                </ul>
              </div>
            )}
            <div className="modal-links flex items-center justify-center gap-4 mt-4">
              {selectedItem.gitUrl && (
                <a
                  className="modal-link-left btn-modern secondary"
                  href={selectedItem.gitUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  Code
                </a>
              )}
              {selectedItem.url && (
                <a
                  className="modal-link-right btn-modern glow"
                  href={selectedItem.url}
                  target="_blank"
                  rel="noopener noreferrer">
                  Project
                </a>
              )}
            </div>
          </div>
        </Modal>
      ) : (
        <></>
      )}
    </Section>
  );
});

Portfolio.displayName = 'Portfolio';
export default Portfolio;

const ItemOverlay: FC<{item: PortfolioItem; onItemSelect: () => void}> = memo(
  ({item: {title, description}, onItemSelect}) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    useDetectOutsideClick(buttonRef, () => {});

    const handleItemClick = useCallback(
      (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        onItemSelect();
      },
      [onItemSelect],
    );

    return (
      <button
        ref={buttonRef}
        type="button"
        aria-label={`Open details for ${title}`}
        onClick={handleItemClick}
        className={classNames(
          'group absolute inset-0 h-full w-full bg-gray-900/0 hover:bg-gray-900/80 transition-colors duration-300 text-left cursor-pointer',
        )}>
        <div className="relative h-full w-full p-4">
          {!isMobile && (
            <div
              className={classNames(
                'relative flex h-full w-full flex-col gap-y-2 text-white',
                'opacity-0 translate-y-2',
                'group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0',
                'transition-all duration-300 ease-out pointer-events-none',
              )}>
              <h2 className="text-lg sm:text-4xl font-bold text-center">{title}</h2>
              <p className="text-lg text-center mt-auto mb-4">Technologies: {description}</p>
              <ExternalLinkIcon className="absolute bottom-1 right-1 h-4 w-4 shrink-0 text-white sm:bottom-2 sm:right-2" />
            </div>
          )}
        </div>
      </button>
    );
  },
);
