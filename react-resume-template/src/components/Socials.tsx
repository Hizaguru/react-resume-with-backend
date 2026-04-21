import {FC, memo} from 'react';

import {socialLinks} from '../data/data';

const Socials: FC = memo(() => {
  return (
    <>
      {socialLinks.map(({label, Icon, href}) => (
        <a
          aria-label={label}
          className="-m-1.5 rounded-md p-1.5 transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:-m-3 sm:p-3"
          href={href}
          key={label}>
          <Icon className="h-5 w-5 align-baseline sm:h-6 sm:w-6" />
        </a>
      ))}
    </>
  );
});

Socials.displayName = 'Socials';
export default Socials;
