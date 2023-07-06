import {
  AcademicCapIcon,
  CalendarIcon, MapIcon,
  OfficeBuildingIcon
} from '@heroicons/react/outline';
import getAge from '../functions/calculateMyAge';
import GithubIcon from '../components/Icon/GithubIcon';
import LinkedInIcon from '../components/Icon/LinkedInIcon';



import testimonialImage from '../images/testimonial.webp';


import {
  About,
  ContactSection,
  ContactType,
  Hero,
  HomepageMeta,
  Skills,
  Social,
  TestimonialSection
} from './dataDef';

/**
 * Page meta data
 */
export const homePageMeta: HomepageMeta = {
  title: 'Jukkis\' portfolio',
  description: 'My Portfolio website that was build with React typescript.',
  author: 'Jukka - Pekka Lappalainen',
  keywords: 'Portfolio, typescript, reat, Jukka-Pekka Lappalainen',
};

/**
 * Section definition
 */
export const SectionId = {
  Hero: 'hero',
  About: 'about',
  Contact: 'contact',
  Portfolio: 'portfolio',
  Resume: 'resume',
  Skills: 'skills',
  Stats: 'stats',
  Testimonials: 'testimonials',
} as const;

export type SectionId = typeof SectionId[keyof typeof SectionId];


/**
 * Hero section
 */
export const heroData: Hero = {
  name: 'I\'m Jukka - Pekka Lappalainen.',
  description: (
    <>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        A Finland based <strong className="text-stone-100">Full Stack Developer, audio </strong>and
        <strong className="text-stone-100"> graphic designer</strong> creating all kinds of projects that come to mind.
      </p>
    </>
  ),
  actions: [
    {
      href: `#${SectionId.Contact}`,
      text: 'Contact',
      primary: false,
    },
  ],
};

/**
 * About section
 */
export const aboutData: About = {

  description: `I am an enthusiastic and experienced full-stack developer with a passion for creating innovative solutions. With a solid educational background in ICT, I have cultivated a diverse skill set that spans programming languages, frameworks, and problem-solving techniques.\n
  I dedicate my spare time to honing my programming skills and working on various personal projects. Beyond programming, I bring a unique perspective to my work, thanks to my extensive experience as a sound engineer. This background has exposed me to both software and hardware aspects, fostering a disciplined approach to troubleshooting and problem-solving.\n\n Feel free to explore my portfolio and get in touch if you're interested in partnering on an exciting venture or if you have any inquiries. Let's create something extraordinary together!`,
  aboutItems: [
    { label: 'Location', text: 'Helsinki', Icon: MapIcon },
    { label: 'Age', text: getAge('05/25/1988'), Icon: CalendarIcon },
    { label: 'Study', text: 'Applied University of Metropolia', Icon: AcademicCapIcon },
    { label: 'Employment', text: 'Fullstack Developer', Icon: OfficeBuildingIcon },
  ],
};

/**
 * Skills section
 */
export const skills: Skills[] = [
  {
    // eslint-disable-next-line
    skillname: "Coding (React, Typescript, Python, Java)",
  },
  {
    skillname: 'Game Development (Unity, Unreal Engine)',
  },
  {
    skillname: 'Operating Systems (Ubuntu, Kali, Windows)',
  },
  {
    skillname: 'Audio Designing & Mixing (Ableton live 10)',
  },
  {
    skillname: 'Graphic Designing (Blender)',
  },
];


/**
 * Portfolio section
 */


/**
 * Testimonial section
 */
export const testimonial: TestimonialSection = {
  imageSrc: testimonialImage,
  testimonials: [
    {
      name: 'Steve Jobs',
      text: 'Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do. If you haven\'t found it yet, keep looking. Don\'t settle. As with all matters of the heart, you\'ll know when you find it.',

    },
    {
      name: 'Emo Philips',
      text: 'A computer once beat me at chess, but it was no match for me at kick boxing.'

    },
    {
      name: 'Craig Bruce',
      text: 'It’s hardware that makes a machine fast. It’s software that makes a fast machine slow.'

    },
    {
      name: 'Homer Simpson, in response to the message, “Press any key”',
      text: 'Where is the ‘any’ key?'
    },
  ],
};

/**
 * Contact section
 */

export const contact: ContactSection = {
  headerText: 'Get in touch.',
  alert: 'Error occured, please try again later',
  messageSent: 'Thank you for your message. I will get back to you!',
  items: [
    {
      type: ContactType.Email,
      text: 'jukka-pekka.lappalainen@outlook.com',
      href: 'mailto:jukka-pekka.lappalainen@outlook.com',
    },
    {
      type: ContactType.Location,
      text: 'Helsinki, Finland',
      href: 'https://goo.gl/maps/9quNchR878t73zDN9',
    },
    {
      type: ContactType.Github,
      text: 'Hizaguru',
      href: 'https://github.com/Hizaguru',
    },
  ],
};

/**
 * Social items
 */
export const socialLinks: Social[] = [
  { label: 'Github', Icon: GithubIcon, href: 'https://github.com/Hizaguru' },
  { label: 'LinkedIn', Icon: LinkedInIcon, href: 'https://www.linkedin.com/in/jukka-pekka-lappalainen-0365001a7/' },
];
