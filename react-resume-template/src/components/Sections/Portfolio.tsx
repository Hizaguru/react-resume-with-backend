import Image from 'next/image';
import {FC, memo, MouseEvent, useCallback, useEffect, useRef, useState} from 'react';
import {buildBlurPlaceholder, buildModalImage, client, urlFor} from '../../client';

import {ArrowTopRightOnSquareIcon} from '@heroicons/react/24/outline';
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
  };

  const handleExited = () => {
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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: '1.5rem',
          }}
          className="portfolio-grid">
          {portfolioItems.map((item, index) => {
            const {title, imgUrl, _updatedAt} = item;
            return (
              <div key={`${_updatedAt}`}>
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '1 / 1',
                    overflow: 'hidden',
                    borderRadius: '0.5rem',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)',
                  }}>
                  <Image
                    alt={title}
                    width={600}
                    height={450}
                    style={{width: '100%', height: '100%', objectFit: 'cover'}}
                    src={urlFor(imgUrl).url()}
                  />
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
        <Modal isOpen={isOpen} handleClose={handleClose} onExited={handleExited}>
          <div className="modal-objects">
            <div className="nextJsImage relative z-0">
              <Image
                src={buildModalImage(selectedItem.modalImgUrl!).url()}
                alt={selectedItem.title}
                width={900}
                height={600}
                style={{width: '100%', height: 'auto'}}
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
            <div
              className="modal-links"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1.75rem 1.5rem',
              }}>
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
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    useDetectOutsideClick(buttonRef as React.RefObject<HTMLElement>, () => {});

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
        className="portfolio-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          background: 'transparent',
          border: 'none',
          textAlign: 'left',
          cursor: 'pointer',
          transition: 'background 0.3s ease',
        }}>
        <div style={{position: 'relative', height: '100%', width: '100%', padding: '1rem'}}>
          {!isMobile && (
            <div
              className="portfolio-overlay-content"
              style={{
                position: 'relative',
                display: 'flex',
                height: '100%',
                width: '100%',
                flexDirection: 'column',
                gap: '0.5rem',
                color: 'white',
                opacity: 0,
                transform: 'translateY(8px)',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                pointerEvents: 'none',
              }}>
              <h2 style={{fontSize: '1.5rem', fontWeight: 700, textAlign: 'center'}}>{title}</h2>
              <p style={{fontSize: '1.1rem', textAlign: 'center', marginTop: 'auto', marginBottom: '1rem'}}>
                Technologies: {description}
              </p>
              <ArrowTopRightOnSquareIcon
                style={{
                  position: 'absolute',
                  bottom: '0.5rem',
                  right: '0.5rem',
                  height: '1rem',
                  width: '1rem',
                  color: 'white',
                }}
              />
            </div>
          )}
        </div>
      </button>
    );
  },
);
