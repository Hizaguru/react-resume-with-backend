import {ChevronUpIcon} from '@heroicons/react/24/outline';
import {FC, memo} from 'react';

import {SectionId} from '../../data/data';
import Socials from '../Socials';

const Footer: FC = memo(() => (
  <footer className="relative border-t border-neutral-800 bg-primary-bg px-4 pb-8 pt-14 sm:px-8 sm:pt-16 sm:pb-10" role="contentinfo">
    <div className="absolute inset-x-0 -top-5 flex justify-center">
      <a
        className="rounded-full border border-neutral-700 bg-secondary-bg p-2 text-text-secondary transition-colors hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
        href={`/#${SectionId.Hero}`}
        aria-label="Back to top">
        <ChevronUpIcon className="h-5 w-5 sm:h-6 sm:w-6" />
      </a>
    </div>
    <div className="mx-auto flex max-w-content flex-col items-center gap-y-6">
      <div className="flex gap-x-4 text-text-secondary">
        <Socials />
      </div>
      <p className="text-sm text-text-secondary">Perttula Software</p>
    </div>
  </footer>
));

Footer.displayName = 'Footer';
export default Footer;
