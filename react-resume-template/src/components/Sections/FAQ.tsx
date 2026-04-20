import {Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/react';
import {ChevronDownIcon} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import {FC, memo} from 'react';

import {faqItems, SectionId} from '../../data/data';
import Section from '../Layout/Section';

const FAQ: FC = memo(() => {
  return (
    <Section className="bg-light-bg" sectionId={SectionId.FAQ}>
      <div className="mx-auto max-w-content">
        <div className="flex flex-col gap-y-12">
          <span className="font-mono text-sm font-semibold uppercase tracking-widest text-accent-muted">FAQ</span>
          <h2 className="font-sans text-3xl font-bold tracking-tight text-text-primary-on-light sm:text-4xl md:text-5xl">
            Questions.
          </h2>
          <div className="mx-auto w-full max-w-3xl">
            <div className="flex flex-col divide-y divide-neutral-200">
              {faqItems.map(({question, answer}) => (
                <Disclosure key={question} as="div">
                  {({open}) => (
                    <>
                      <DisclosureButton className="flex w-full items-center justify-between py-5 text-left hover:bg-zinc-100 rounded-md">
                        <span className="font-sans text-base font-medium text-text-primary-on-light sm:text-lg">
                          {question}
                        </span>
                        <ChevronDownIcon
                          className={classNames(
                            'ml-4 h-5 w-5 shrink-0 text-neutral-500 transition-transform duration-200',
                            open && 'rotate-180',
                          )}
                        />
                      </DisclosureButton>
                      <DisclosurePanel className="pb-5 pr-12">
                        <p className="text-sm leading-relaxed text-neutral-600 sm:text-base">{answer}</p>
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
});

FAQ.displayName = 'FAQ';
export default FAQ;
