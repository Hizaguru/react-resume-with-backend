import {Dialog, DialogBackdrop, Transition, TransitionChild} from '@headlessui/react';
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Link from 'next/link';
import {FC, Fragment, memo, useCallback, useEffect, useMemo, useState} from 'react';

import {SectionId} from '../../data/data';
import {useNavObserver} from '../../hooks/useNavObserver';

export const headerID = 'headerNav';

const navLabels: Record<string, string> = {
  [SectionId.Hero]: 'Home',
  [SectionId.Services]: 'Services',
  [SectionId.Portfolio]: 'Work',
  [SectionId.About]: 'About',
  [SectionId.Contact]: 'Contact',
};

const Header: FC = memo(() => {
  const [currentSection, setCurrentSection] = useState<SectionId | null>(null);
  const navSections = useMemo(
    () => [SectionId.Hero, SectionId.Services, SectionId.Portfolio, SectionId.About, SectionId.Contact],
    [],
  );

  const intersectionHandler = useCallback((section: SectionId | null) => {
    section && setCurrentSection(section);
  }, []);

  useNavObserver(navSections.map(section => `#${section}`).join(','), intersectionHandler);

  return (
    <>
      <MobileNav currentSection={currentSection} navSections={navSections} />
      <DesktopNav currentSection={currentSection} navSections={navSections} />
    </>
  );
});

const DesktopNav: FC<{navSections: SectionId[]; currentSection: SectionId | null}> = memo(
  ({navSections, currentSection}) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => setScrolled(window.scrollY > 50);
      window.addEventListener('scroll', handleScroll, {passive: true});
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const baseClass =
      '-m-1.5 p-1.5 rounded-md font-medium text-sm transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent relative';
    const activeClass = classNames(baseClass, 'text-accent');
    const inactiveClass = classNames(baseClass, 'text-text-secondary hover:text-text-primary');
    return (
      <header
        className={classNames(
          'fixed top-0 z-50 hidden w-full animate-slide-down p-4 backdrop-blur-md transition-all duration-500 sm:block',
          scrolled
            ? 'border-b border-neutral-800 bg-primary-bg/90 shadow-lg shadow-black/20'
            : 'border-b border-transparent bg-transparent',
        )}
        id={headerID}>
        <nav className="mx-auto flex max-w-content items-center justify-between">
          <Link href={`/#${SectionId.Hero}`} className="group flex items-center gap-2 font-sans text-sm font-bold text-text-primary">
            <span className="inline-block h-2 w-2 rounded-full bg-accent transition-transform duration-300 group-hover:scale-125" />
            Perttula Software
          </Link>
          <div className="flex gap-x-8">
            {navSections.map(section => (
              <NavItem
                activeClass={activeClass}
                current={section === currentSection}
                inactiveClass={inactiveClass}
                key={section}
                section={section}
                label={navLabels[section] ?? section}
              />
            ))}
          </div>
        </nav>
      </header>
    );
  },
);

const MobileNav: FC<{navSections: SectionId[]; currentSection: SectionId | null}> = memo(
  ({navSections, currentSection}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleOpen = useCallback(() => {
      setIsOpen(!isOpen);
    }, [isOpen]);

    const baseClass =
      'p-2 rounded-md transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent';
    const activeClass = classNames(baseClass, 'bg-secondary-bg text-accent font-semibold');
    const inactiveClass = classNames(baseClass, 'text-text-secondary font-medium');
    return (
      <>
        <button
          aria-label="Menu Button"
          className="fixed top-3 right-3 z-40 rounded-md bg-accent p-2 hover:bg-accent-hover focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-accent sm:hidden"
          onClick={toggleOpen}>
          <Bars3Icon className="h-7 w-7 text-white" />
          <span className="sr-only">Open sidebar</span>
        </button>
        <Transition as={Fragment} show={isOpen}>
          <Dialog as="div" className="fixed inset-0 z-40 flex sm:hidden" onClose={toggleOpen}>
            <TransitionChild
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <DialogBackdrop className="fixed inset-0 bg-black/60" />
            </TransitionChild>
            <TransitionChild
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full">
              <div className="relative w-4/5 bg-primary-bg">
                <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-4">
                  <span className="font-sans text-sm font-bold text-text-primary">Perttula Software</span>
                  <button onClick={toggleOpen} className="text-text-secondary hover:text-text-primary">
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <nav className="mt-4 flex flex-col gap-y-1 px-3">
                  {navSections.map(section => (
                    <NavItem
                      activeClass={activeClass}
                      current={section === currentSection}
                      inactiveClass={inactiveClass}
                      key={section}
                      onClick={toggleOpen}
                      section={section}
                      label={navLabels[section] ?? section}
                    />
                  ))}
                </nav>
              </div>
            </TransitionChild>
          </Dialog>
        </Transition>
      </>
    );
  },
);

const NavItem: FC<{
  section: string;
  current: boolean;
  activeClass: string;
  inactiveClass: string;
  label: string;
  onClick?: () => void;
}> = memo(({section, current, inactiveClass, activeClass, label, onClick}) => {
  return (
    <Link href={`/#${section}`} passHref>
      <div className={classNames(current ? activeClass : inactiveClass)} key={section} onClick={onClick}>
        {label}
        {/* Animated underline indicator */}
        <span
          className={classNames(
            'absolute bottom-0 left-1/2 h-px -translate-x-1/2 bg-accent transition-all duration-300',
            current ? 'w-full' : 'w-0',
          )}
        />
      </div>
    </Link>
  );
});

Header.displayName = 'Header';
export default Header;
