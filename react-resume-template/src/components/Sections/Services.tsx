import {FC, memo} from 'react';

import {SectionId, services} from '../../data/data';
import Section from '../Layout/Section';

const Services: FC = memo(() => {
  return (
    <Section className="bg-secondary-bg" sectionId={SectionId.Services}>
      <div className="mx-auto max-w-content">
        <div className="flex flex-col gap-y-16">
          {/* Section header */}
          <div className="flex flex-col gap-y-4">
            <span className="font-mono text-sm font-semibold uppercase tracking-widest text-accent">Services</span>
            <h2 className="font-sans text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
              What I build.
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
              Fullstack development services for businesses that need reliable, modern software.
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-800 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({icon: Icon, title, description}, index) => (
              <div
                key={title}
                className="group relative flex flex-col gap-y-4 bg-secondary-bg p-8 transition-all duration-500 hover:bg-surface"
                {/* Accent glow on hover */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: 'radial-gradient(ellipse 50% 50% at 50% 0%, rgba(37,99,235,0.08) 0%, transparent 70%)',
                  }}
                />

                {/* Icon with accent background */}
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 ring-1 ring-accent/20 transition-all duration-300 group-hover:bg-accent/15 group-hover:ring-accent/40">
                  <Icon className="h-6 w-6 text-accent transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Content */}
                <div className="relative flex flex-col gap-y-2">
                  <h3 className="font-sans text-lg font-semibold text-text-primary">{title}</h3>
                  <p className="text-sm leading-relaxed text-text-secondary">{description}</p>
                </div>

                {/* Subtle bottom accent line on hover */}
                <div className="absolute inset-x-8 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-accent/40 to-transparent transition-transform duration-500 group-hover:scale-x-100" />

                {/* Number index */}
                <span className="absolute top-6 right-6 font-mono text-xs text-text-tertiary transition-colors duration-300 group-hover:text-text-secondary">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
});

Services.displayName = 'Services';
export default Services;
