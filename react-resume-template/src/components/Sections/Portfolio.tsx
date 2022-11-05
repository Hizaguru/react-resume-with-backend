import { ExternalLinkIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import Image from 'next/image';
import { FC, memo, MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { client, urlFor } from '../../client';

import { isMobile } from '../../config';
import { SectionId } from '../../data/data';
import { PortfolioItem } from '../../data/dataDef';
import useDetectOutsideClick from '../../hooks/useDetectOutsideClick';
import Section from '../Layout/Section';
import Modal from '../Modal/Modal';




const Portfolio: FC = memo(() => {


  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  useEffect(() => {
    const query = '*[_type == "portfolioItems"]';
    client.fetch(query).then((data) => {
      setPortfolioItems(data);
    });
  }, []);


  return (
    <Section className="bg-neutral-800" sectionId={SectionId.Portfolio}>
      <div className="flex flex-col gap-y-8">
        <h2 className="self-center text-xl font-bold text-white">Check out some of my work</h2>
        <div className="w-full sm:columns-1 md:columns-2 lg:columns-2">
          {portfolioItems.map((item, index) => {
            const { title, imgUrl } = item;
            return (
              <div className="pb-6" key={`${title}-${index}`}>
                <div
                  className={classNames(
                    'relative h-max w-full overflow-hidden rounded-lg shadow-lg shadow-black/30 lg:shadow-xl',
                  )}>
                  <Image alt={title} layout="responsive" width={"600px"} height={"600px"} src={urlFor(imgUrl).url()} />
                  <ItemOverlay item={portfolioItems[index]} />
                </div>
              </div>

            );
          })}
        </div>
      </div>
    </Section>
  );
});

Portfolio.displayName = 'Portfolio';
export default Portfolio;

const ItemOverlay: FC<{ item: PortfolioItem }> = memo(({ item: { title, description, modalTitle, modalDescription, modalImgUrl: modalImage, gitUrl, url } }) => {
  const [mobile, setMobile] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const linkRef = useRef<HTMLAnchorElement>(null);




  useEffect(() => {
    // Avoid hydration styling errors by setting mobile in useEffect
    if (isMobile) {
      setMobile(true);
    }
  }, []);
  useDetectOutsideClick(linkRef, () => setShowOverlay(false));

  const handleItemClick = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (!isOpen) {
        setIsOpen(true)
      }
    },
    [isOpen],
  );

  return (
    <a
      className={classNames(
        'absolute inset-0 h-full w-full  bg-gray-900 transition-all duration-300',
        { 'opacity-0 hover:opacity-80': !mobile },
        showOverlay ? 'opacity-80' : 'opacity-0',
      )}

      onClick={handleItemClick}
      ref={linkRef}
      target="_blank">
      <div className="relative h-full w-full p-4">
        <div className="text-center flex h-full w-full flex-col gap-y-2 overflow-hidden">
          <h2 className="text-3xl lg:text-2xl font-bold text-white opacity-100">{title}</h2>
          <p className="sm:py-72 text-2xl lg:text-2xl lg:py-48 py-36 text-white opacity-100">{description}</p>
        </div>
        <ExternalLinkIcon className="absolute bottom-1 right-1 h-4 w-4 shrink-0 text-white sm:bottom-2 sm:right-2" />
        <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
          <div>
            <div className='modal-objects'>
              <Image alt={title} height="150px" width="400px" layout="responsive" src={urlFor(modalImage!).url()} />
              <h1 className="modal-header"><b>{modalTitle}</b></h1>
              <p className='modal-description'>{modalDescription}</p>
            </div>
            {gitUrl !== undefined ? (
              <div className='modal-links'>
                <a className='modal-link-left' onClick={() => window.open(gitUrl)} href={gitUrl} target="_blank"><b>Code</b></a>
                <a className='modal-link-right' onClick={() => window.open(url)} href={url} target="_blank"><b>Project</b></a>
              </div>
            ) : (
              <div className='modal-links'>
                <a className='modal-link-right' onClick={() => window.open(url)} href={url} target="_blank">Project</a>
              </div>
            )}
          </div>
        </Modal>

      </div >
    </a >
  );
});
