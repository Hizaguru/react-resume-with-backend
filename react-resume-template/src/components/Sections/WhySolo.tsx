import {FC, memo} from 'react';

import {SectionId} from '../../data/data';
import Section from '../Layout/Section';

const WhySolo: FC = memo(() => {
  return (
    <Section className="bg-secondary-bg" sectionId={SectionId.Stats}>
      <div className="mx-auto max-w-content">
        <div className="flex flex-col gap-y-12">
          <span className="font-mono text-sm font-semibold uppercase tracking-widest text-accent">Solo Advantage</span>
          <h2 className="font-sans text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
            Why hire one developer instead of an agency?
          </h2>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="flex flex-col gap-y-6">
              <p className="text-base leading-relaxed text-text-secondary">
                Agencies sell you a team. You get a project manager, a designer, a frontend developer, a backend
                developer, and a QA engineer. Sounds comprehensive — until you realize:
              </p>
              <ul className="flex flex-col gap-y-4">
                <li className="flex gap-x-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <p className="text-base leading-relaxed text-text-secondary">
                    <span className="font-semibold text-text-primary">
                      You&apos;re paying for coordination, not code.
                    </span>{' '}
                    Half the budget goes to people managing other people.
                  </p>
                </li>
                <li className="flex gap-x-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <p className="text-base leading-relaxed text-text-secondary">
                    <span className="font-semibold text-text-primary">Nobody owns the full picture.</span> The frontend
                    developer doesn&apos;t understand the backend. The backend developer has never seen the deployment
                    config.
                  </p>
                </li>
                <li className="flex gap-x-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <p className="text-base leading-relaxed text-text-secondary">
                    <span className="font-semibold text-text-primary">Communication gets filtered.</span> Your feedback
                    passes through a project manager before reaching the person who can actually act on it.
                  </p>
                </li>
              </ul>
              <p className="text-base leading-relaxed text-text-secondary">
                With Perttula Software, you get one senior developer who understands every layer of your system.
                Decisions are faster. Communication is direct. There&apos;s nowhere to hide and no one to blame.
              </p>
            </div>
            <div className="flex flex-col gap-y-6 rounded-lg border border-neutral-700 bg-primary-bg p-8">
              <h3 className="font-sans text-lg font-semibold text-text-primary">When an agency makes sense</h3>
              <p className="text-base leading-relaxed text-text-secondary">
                If your project genuinely requires 5+ specialists working simultaneously, hire an agency. For everything
                else — and that&apos;s most projects — one capable developer is faster, cheaper, and more accountable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
});

WhySolo.displayName = 'WhySolo';
export default WhySolo;
