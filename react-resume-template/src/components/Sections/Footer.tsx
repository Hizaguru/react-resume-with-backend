import {ChevronUpIcon} from '@heroicons/react/24/outline';
import {motion, useReducedMotion} from 'framer-motion';
import {FC, memo} from 'react';

import {SectionId} from '../../data/data';
import Reveal from '../motion/Reveal';
import Socials from '../Socials';

const Footer: FC = memo(() => {
  const shouldReduceMotion = useReducedMotion();
  const year = new Date().getFullYear();
  return (
    <footer
      className="relative border-t border-border bg-background px-4 pb-10 pt-16 sm:px-8"
      role="contentinfo">
      <div className="absolute inset-x-0 -top-5 flex justify-center">
        <motion.a
          aria-label="Back to top"
          className="rounded-full border border-border bg-card p-2 text-foreground shadow-sm hover:bg-muted hover:shadow-[0_8px_24px_-12px_rgba(124,58,237,0.5)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          href={`/#${SectionId.Hero}`}
          transition={{type: 'spring', stiffness: 320, damping: 22, mass: 0.6}}
          whileHover={shouldReduceMotion ? undefined : {y: -3, scale: 1.06}}
          whileTap={shouldReduceMotion ? undefined : {scale: 0.94}}>
          <ChevronUpIcon className="h-5 w-5" />
        </motion.a>
      </div>
      <Reveal direction="up" distance={8}>
        <div className="mx-auto max-w-6xl flex flex-col-reverse items-center gap-6 sm:flex-row sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {year} Jukka-Pekka Lappalainen. Built with Next.js + Tailwind.
          </p>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Socials />
          </div>
        </div>
      </Reveal>
    </footer>
  );
});

Footer.displayName = 'Footer';
export default Footer;

