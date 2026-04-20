import {DevicePhoneMobileIcon, EnvelopeIcon, MapPinIcon} from '@heroicons/react/24/outline';
import {FC, memo} from 'react';

import {contact, SectionId} from '../../../data/data';
import {ContactType, ContactValue} from '../../../data/dataDef';
import GithubIcon from '../../Icon/GithubIcon';
import LinkedInIcon from '../../Icon/LinkedInIcon';
import Section from '../../Layout/Section';
import ContactForm from './ContactForm';

const ContactValueMap: Record<ContactType, ContactValue> = {
  [ContactType.Email]: {Icon: EnvelopeIcon, srLabel: 'Email'},
  [ContactType.Phone]: {Icon: DevicePhoneMobileIcon, srLabel: 'Phone'},
  [ContactType.Location]: {Icon: MapPinIcon, srLabel: 'Location'},
  [ContactType.Github]: {Icon: GithubIcon, srLabel: 'Github'},
  [ContactType.LinkedIn]: {Icon: LinkedInIcon, srLabel: 'LinkedIn'},
};

const Contact: FC = memo(() => {
  const {headerText, items} = contact;
  return (
    <Section className="bg-primary-bg" sectionId={SectionId.Contact}>
      <div className="mx-auto max-w-content">
        <div className="flex flex-col gap-y-12">
          <div className="flex flex-col gap-y-4">
            <span className="font-mono text-sm font-semibold uppercase tracking-widest text-accent">Contact</span>
            <h2 className="font-sans text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl">{headerText}</h2>
            <p className="max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
              Tell me about your project. I&apos;ll get back to you within one business day.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <ContactForm />
            </div>
            <div className="order-1 flex flex-col gap-y-6 lg:order-2">
              <dl className="flex flex-col gap-y-4">
                {items.map(({type, text, href}) => {
                  const {Icon, srLabel} = ContactValueMap[type];
                  return (
                    <div key={srLabel}>
                      <dt className="sr-only">{srLabel}</dt>
                      <dd className="flex items-center">
                        <a
                          className="flex items-center gap-x-3 text-text-secondary transition-colors hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer">
                          <Icon aria-hidden="true" className="h-5 w-5 shrink-0 text-text-secondary" />
                          <span className="break-all text-sm sm:text-base">{text}</span>
                        </a>
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
});

Contact.displayName = 'Contact';
export default Contact;
