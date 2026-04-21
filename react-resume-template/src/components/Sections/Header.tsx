import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Link from 'next/link';
import {FC, memo, useCallback, useEffect, useMemo, useState} from 'react';

import {SectionId} from '../../data/data';
import {useNavObserver} from '../../hooks/useNavObserver';
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
      {id: SectionId.Contact, label: 'Contact'},
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
  const headerClasses = classNames(
    'fixed top-0 z-50 hidden w-full transition-colors duration-200 sm:block',
    scrolled
      ? 'bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border'
      : 'bg-transparent',
  );

  return (
    <header className={headerClasses} id={headerID}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link
          className="rounded-md text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          href="/#hero">
          JP
        </Link>
        <ul className="flex items-center gap-6">
          {navSections.map(s => (
            <li key={s.id}>
              <NavItem current={s.id === currentSection} entry={s} />
            </li>
          ))}
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
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
      {isOpen ? (
        <div className="fixed inset-0 z-30 flex sm:hidden">
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-background/80 backdrop-blur"
            onClick={close}
            type="button"
          />
          <nav
            aria-label="Primary"
            className="relative ml-auto flex h-full w-4/5 max-w-xs flex-col gap-2 border-l border-border bg-card p-6 pt-20 shadow-xl">
            {navSections.map(s => (
              <NavItem current={s.id === currentSection} entry={s} key={s.id} mobile onClick={close} />
            ))}
          </nav>
        </div>
      ) : null}
    </>
  );
});

interface NavItemProps {
  entry: NavEntry;
  current: boolean;
  onClick?: () => void;
  mobile?: boolean;
}

const NavItem: FC<NavItemProps> = memo(({entry, current, onClick, mobile}) => {
  const base =
    'relative rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';
  const desktop = 'px-1.5 py-1';
  const mob = 'px-3 py-2 text-base hover:bg-muted';
  const desktopActive =
    'text-primary after:content-[""] after:absolute after:inset-x-1.5 after:-bottom-1 after:h-0.5 after:bg-primary after:rounded-full';
  const desktopInactive = 'text-muted-foreground hover:text-foreground';
  const mobileActive = 'text-primary';
  const mobileInactive = 'text-foreground';

  const desktopStateClasses = current ? desktopActive : desktopInactive;
  const mobileStateClasses = current ? mobileActive : mobileInactive;
  const stateClasses = mobile ? mobileStateClasses : desktopStateClasses;

  return (
    <Link
      aria-current={current ? 'page' : undefined}
      className={classNames(base, mobile ? mob : desktop, stateClasses)}
      href={`/#${entry.id}`}
      onClick={onClick}>
      {entry.label}
    </Link>
  );
});

Header.displayName = 'Header';

export default Header;
