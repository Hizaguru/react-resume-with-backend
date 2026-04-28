import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import {AnimatePresence, motion, useReducedMotion, useScroll, useSpring} from 'framer-motion';
import Link from 'next/link';
import {FC, memo, useCallback, useEffect, useMemo, useState} from 'react';

import {SectionId} from '../../data/data';
import {useNavObserver} from '../../hooks/useNavObserver';
import {EASE_OUT} from '../motion/tokens';
import ThemeToggle from '../theme/ThemeToggle';

export const headerID = 'headerNav';

interface NavEntry {
  id: SectionId;
  label: string;
}

const Header: FC = memo(() => {
  const [currentSection, setCurrentSection] = useState<SectionId | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const navSections: NavEntry[] = useMemo(
    () => [
      {id: SectionId.About, label: 'About'},
      {id: SectionId.Expertise, label: 'Expertise'},
      {id: SectionId.Projects, label: 'Projects'},
      {id: SectionId.Testimonials, label: 'Testimonials'},
    ],
    [],
  );

  const intersectionHandler = useCallback((section: SectionId | null) => {
    if (section) setCurrentSection(section);
  }, []);

  useNavObserver(navSections.map(s => `#${s.id}`).join(','), intersectionHandler);

  useEffect(() => {
    const onScroll = (): void => setScrolled(globalThis.scrollY > 8);
    onScroll();
    globalThis.addEventListener('scroll', onScroll, {passive: true});
    return () => globalThis.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <DesktopNav currentSection={currentSection} navSections={navSections} scrolled={scrolled} />
      <MobileNav currentSection={currentSection} navSections={navSections} />
    </>
  );
});

interface NavProps {
  navSections: NavEntry[];
  currentSection: SectionId | null;
}

const DesktopNav: FC<NavProps & {scrolled: boolean}> = memo(({navSections, currentSection, scrolled}) => {
  const shouldReduceMotion = useReducedMotion();
  // Page-scroll progress — 0–1 across the whole document. Used as a thin top
  // accent line that fills as the user reads.
  const {scrollYProgress} = useScroll();
  const progress = useSpring(scrollYProgress, {stiffness: 120, damping: 24, mass: 0.6});

  const headerClasses = classNames(
    'fixed top-0 z-50 hidden w-full transition-colors duration-300 sm:block',
    scrolled
      ? 'bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border'
      : 'bg-transparent',
  );

  return (
    <motion.header
      animate={{y: 0, opacity: 1}}
      className={headerClasses}
      id={headerID}
      initial={shouldReduceMotion ? false : {y: -32, opacity: 0}}
      transition={{duration: 0.5, ease: EASE_OUT, delay: 0.1}}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link
          className={classNames(
            'rounded-md text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            scrolled
              ? 'text-foreground hover:text-primary'
              : 'text-white/90 hover:text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]',
          )}
          href="/#hero">
          JP
        </Link>
        <ul className="flex items-center gap-6">
          {navSections.map(s => (
            <li key={s.id}>
              <NavItem current={s.id === currentSection} entry={s} scrolled={scrolled} />
            </li>
          ))}
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
      {/* Scroll progress accent — visual cue of how far through the page the user is */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px origin-left bg-gradient-to-r from-primary/0 via-primary to-primary/0"
        style={shouldReduceMotion ? {transform: 'scaleX(0)'} : {scaleX: progress}}
      />
    </motion.header>
  );
});

const MobileNav: FC<NavProps> = memo(({navSections, currentSection}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => setIsOpen(o => !o), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <div className="fixed right-2 top-2 z-40 flex items-center gap-2 sm:hidden">
        <ThemeToggle />
        <button
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          className="rounded-md bg-primary p-2 text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          onClick={toggleOpen}
          type="button">
          {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            animate={{opacity: 1}}
            className="fixed inset-0 z-30 flex sm:hidden"
            exit={{opacity: 0}}
            initial={{opacity: 0}}
            transition={{duration: 0.2, ease: EASE_OUT}}>
            <button
              aria-label="Close menu"
              className="absolute inset-0 bg-background/80 backdrop-blur"
              onClick={close}
              type="button"
            />
            <motion.nav
              animate={{x: 0}}
              aria-label="Primary"
              className="relative ml-auto flex h-full w-4/5 max-w-xs flex-col gap-2 border-l border-border bg-card p-6 pt-20 shadow-xl"
              exit={{x: '100%'}}
              initial={{x: '100%'}}
              transition={{type: 'spring', stiffness: 320, damping: 32, mass: 0.8}}>
              {navSections.map(s => (
                <NavItem current={s.id === currentSection} entry={s} key={s.id} mobile onClick={close} />
              ))}
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
});

interface NavItemProps {
  entry: NavEntry;
  current: boolean;
  scrolled?: boolean;
  onClick?: () => void;
  mobile?: boolean;
}

const NavItem: FC<NavItemProps> = memo(({entry, current, scrolled = true, onClick, mobile}) => {
  const base =
    'relative rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';
  const desktop = 'px-1.5 py-1';
  const mob = 'px-3 py-2 text-base hover:bg-muted';
  const desktopInactive = scrolled
    ? 'text-muted-foreground hover:text-foreground'
    : 'text-white/75 hover:text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]';
  const desktopActiveText = scrolled ? 'text-primary' : 'text-white drop-shadow-[0_1px_10px_rgba(0,0,0,0.5)]';
  const mobileActive = 'text-primary';
  const mobileInactive = 'text-foreground';

  const desktopStateClasses = current ? desktopActiveText : desktopInactive;
  const mobileStateClasses = current ? mobileActive : mobileInactive;
  const stateClasses = mobile ? mobileStateClasses : desktopStateClasses;

  return (
    <Link
      aria-current={current ? 'page' : undefined}
      className={classNames(base, mobile ? mob : desktop, stateClasses)}
      href={`/#${entry.id}`}
      onClick={onClick}>
      {entry.label}
      {/* Animated underline — only on desktop. Uses layoutId so it slides between */}
      {/* the active nav item rather than fading in/out per item. */}
      {!mobile && current ? (
        <motion.span
          aria-hidden="true"
          className="absolute inset-x-1.5 -bottom-1 h-0.5 rounded-full bg-primary"
          layoutId="nav-underline"
          transition={{type: 'spring', stiffness: 380, damping: 30}}
        />
      ) : null}
    </Link>
  );
});

Header.displayName = 'Header';

export default Header;
