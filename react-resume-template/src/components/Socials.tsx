import {FC, memo} from 'react';

import {socialLinks} from '../data/data';

const Socials: FC = memo(() => {
  return (
    <>
      {socialLinks.map(({label, Icon, href}) => (
        <a
          aria-label={`Visit my ${label} profile (opens in new tab)`}
          className="-m-1.5 rounded-md p-1.5 transition-all duration-300 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500  sm:-m-3 sm:p-3"
          href={href}
          key={label}
          target="_blank"
          rel="noopener noreferrer">
          <Icon className="h-5 w-5 align-baseline sm:h-6 sm:w-6" aria-hidden="true" />
        </a>
      ))}
    </>
  );
});

Socials.displayName = 'Socials';
export default Socials;
