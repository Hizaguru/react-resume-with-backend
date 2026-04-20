import {FC, memo} from 'react';

import {SectionId, techStack} from '../../../data/data';
import Section from '../../Layout/Section';

const Resume: FC = memo(() => {
  return (
    <Section className="bg-secondary-bg" sectionId={SectionId.Resume}>
      <div className="mx-auto max-w-content">
        <div className="flex flex-col gap-y-12">
          <div className="flex flex-col gap-y-4">
            <span className="font-mono text-sm font-semibold uppercase tracking-widest text-accent">Stack</span>
            <h2 className="font-sans text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
              Tools I work with.
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
              I pick the right tool for the job.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {techStack.map(cat => (
              <div key={cat.category} className="flex flex-col gap-y-3">
                <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-text-secondary">
                  {cat.category}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {cat.technologies.map(tech => (
                    <li
                      key={tech}
                      className="rounded-md border border-neutral-700 bg-primary-bg px-3 py-1.5 font-mono text-xs text-text-secondary hover:border-accent/30 hover:text-text-primary transition-colors duration-200">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
});

Resume.displayName = 'Resume';
export default Resume;
