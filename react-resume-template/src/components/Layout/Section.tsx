import classNames from 'classnames';
import {FC, memo, ReactNode} from 'react';

import {SectionId} from '../../data/data';

const Section: FC<{
  children: ReactNode;
  sectionId: SectionId;
  sectionTitle?: string;
  noPadding?: boolean;
  className?: string;
}> = memo(({children, sectionId, noPadding = false, className}) => {
  return (
    <section className={classNames(className, {'px-4 py-20 sm:px-6 md:py-28 lg:px-12': !noPadding})} id={sectionId}>
      <div className={classNames({'mx-auto max-w-(--breakpoint-lg)': !noPadding})}>{children}</div>
    </section>
  );
});

Section.displayName = 'Section';
export default Section;
