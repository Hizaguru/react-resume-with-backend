import {FC, memo} from 'react';

import {SectionId, valueProps} from '../../data/data';
import Section from '../Layout/Section';

const ValueProp: FC = memo(() => {
  return (
    <Section className="bg-light-bg" sectionId={SectionId.About}>
      <div className="mx-auto max-w-content">
        <div className="flex flex-col gap-y-12">
          <div className="flex flex-col gap-y-4">
            <h2 className="font-sans text-3xl font-bold tracking-tight text-text-primary-on-light sm:text-4xl">
              One developer. Full ownership. Zero overhead.
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
              When you hire Perttula Software, you work directly with the person writing your code. No account managers.
              No junior developers learning on your project. No handoffs between teams.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {valueProps.map(({title, description}) => (
              <div
                key={title}
                className="flex flex-col gap-y-3 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
                <h3 className="font-sans text-lg font-semibold text-text-primary-on-light">{title}</h3>
                <p className="text-sm leading-relaxed text-neutral-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
});

ValueProp.displayName = 'ValueProp';
export default ValueProp;
