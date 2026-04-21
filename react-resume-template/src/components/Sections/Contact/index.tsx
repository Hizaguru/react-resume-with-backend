import {DevicePhoneMobileIcon, EnvelopeIcon, MapPinIcon} from '@heroicons/react/24/outline';
import {FC, memo} from 'react';

import {contact, SectionId} from '../../../data/data';
import {ContactType, ContactValue} from '../../../data/dataDef';
import GithubIcon from '../../Icon/GithubIcon';
import LinkedInIcon from '../../Icon/LinkedInIcon';
import ContactForm from './ContactForm';

const HEADING_ID = 'contact-heading';

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
    <section
      aria-labelledby={HEADING_ID}
      className="bg-background py-24 sm:py-32 lg:py-40"
      id={SectionId.Contact}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">Get in touch</p>
        <h2
          className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground"
          id={HEADING_ID}>
          {headerText ?? "Let's build something together."}
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16 items-start">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
          <div className="lg:col-span-2">
            <dl className="flex flex-col gap-6 border-t border-border pt-6">
              {items.map(({type, text, href}) => {
                const {Icon, srLabel} = ContactValueMap[type];
                return (
                  <div className="flex flex-col gap-1" key={srLabel}>
                    <dt className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                      {srLabel}
                    </dt>
                    <dd>
                      <a
                        className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                        href={href}
                        rel="noreferrer"
                        target="_blank">
                        <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" />
                        <span className="break-all">{text}</span>
                      </a>
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';
export default Contact;

