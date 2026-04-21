import {ChevronUpIcon} from '@heroicons/react/24/outline';
import {FC, memo} from 'react';

import {SectionId} from '../../data/data';
import Socials from '../Socials';

const Footer: FC = memo(() => {
  const year = new Date().getFullYear();
  return (
    <footer
      className="relative border-t border-border bg-background px-4 pb-10 pt-16 sm:px-8"
      role="contentinfo">
      <div className="absolute inset-x-0 -top-5 flex justify-center">
        <a
          aria-label="Back to top"
          className="rounded-full border border-border bg-card p-2 text-foreground shadow-sm hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          href={`/#${SectionId.Hero}`}>
          <ChevronUpIcon className="h-5 w-5" />
        </a>
      </div>
      <div className="mx-auto max-w-6xl flex flex-col-reverse items-center gap-6 sm:flex-row sm:justify-between">
        <p className="text-xs text-muted-foreground">
          © {year} Jukka-Pekka Lappalainen. Built with Next.js + Tailwind.
        </p>
        <div className="flex items-center gap-4 text-muted-foreground">
          <Socials />
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
export default Footer;

