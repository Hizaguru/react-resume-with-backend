import {FC, memo} from 'react';

import {processSteps, SectionId} from '../../data/data';
import Section from '../Layout/Section';

const Process: FC = memo(() => {
  return (
    <Section className="bg-light-bg" sectionId={SectionId.Process}>
      <div className="mx-auto max-w-content">
        <div className="flex flex-col gap-y-12">
          <div className="flex flex-col gap-y-4">
            <span className="font-mono text-sm font-semibold uppercase tracking-widest text-accent-muted">Process</span>
            <h2 className="font-sans text-3xl font-bold tracking-tight text-text-primary-on-light sm:text-4xl md:text-5xl">
              How it works.
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
              A clear, no-surprises process from first conversation to delivered product.
            </p>
          </div>

          {/* Desktop: horizontal timeline */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute left-0 right-0 top-6 h-px bg-zinc-300" />
              <div className="grid grid-cols-5 gap-8">
                {processSteps.map(({number, title, description}) => (
                  <div key={number} className="relative flex flex-col gap-y-4">
                    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-accent font-mono text-sm font-bold text-white shadow-md shadow-accent/20">
                      {number}
                    </div>
                    <h3 className="font-sans text-base font-semibold text-text-primary-on-light">{title}</h3>
                    <p className="text-sm leading-relaxed text-neutral-600">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile/tablet: vertical timeline */}
          <div className="lg:hidden">
            <div className="relative flex flex-col gap-y-8">
              <div className="absolute bottom-0 left-6 top-0 w-px bg-zinc-300" />
              {processSteps.map(({number, title, description}) => (
                <div key={number} className="relative flex gap-x-6">
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-sm font-bold text-white shadow-md shadow-accent/20">
                    {number}
                  </div>
                  <div className="flex flex-col gap-y-2 pt-1">
                    <h3 className="font-sans text-base font-semibold text-text-primary-on-light">{title}</h3>
                    <p className="text-sm leading-relaxed text-neutral-600">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
});

Process.displayName = 'Process';
export default Process;
