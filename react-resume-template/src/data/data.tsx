import {
  AcademicCapIcon,
  CalendarIcon, MapIcon,
  OfficeBuildingIcon
} from '@heroicons/react/outline';

import GithubIcon from '../components/Icon/GithubIcon';
import LinkedInIcon from '../components/Icon/LinkedInIcon';

import porfolioImage1 from '../images/portfolio/portfolio-1.webp';
import porfolioImage2 from '../images/portfolio/portfolio-2.webp';
import porfolioImage3 from '../images/portfolio/portfolio-3.webp';
import porfolioImage4 from '../images/portfolio/portfolio-4.webp';
import porfolioImage5 from '../images/portfolio/portfolio-5.webp';
import porfolioImage6 from '../images/portfolio/portfolio-6.webp';
import testimonialImage from '../images/testimonial.webp';

import {
  About,
  ContactSection,
  ContactType,
  Hero,
  HomepageMeta,
  PortfolioItem, Skills,
  Social,
  TestimonialSection
} from './dataDef';

/**
 * Page meta data
 */
export const homePageMeta: HomepageMeta = {
  title: "Jukkis' portfolio",
  description: "Portfolio build with React typescript",
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
  name: `I'm Jukka - Pekka Lappalainen.`,
  description: (
    <>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        I'm a Finland based <strong className="text-stone-100">Full Stack Software Engineer, audio </strong>and
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

  description: `I’m an Information and Communications Technology student at Metropolia University of Applied Science. 
  To compliment my formal studies, I teach myself programming in my spare time by working on my own programming-related projects 
  and keep up to date with what is happening in the world of technology. In addition to programming, I have been a sound engineer 
  for many years which has given me different exposure to software and hardware, as well as a disciplined approach to troubleshooting 
  and problem solving. `,
  aboutItems: [
    { label: 'Location', text: 'Helsinki', Icon: MapIcon },
    { label: 'Age', text: '34', Icon: CalendarIcon },
    { label: 'Study', text: 'Applied University of Metropolia', Icon: AcademicCapIcon },
    { label: 'Employment', text: 'Sanoma Media Finland', Icon: OfficeBuildingIcon },
  ],
};

/**
 * Skills section
 */
export const skills: Skills[] = [
  {
    // eslint-disable-next-line
    skillname: "Coding (React, Typescript, Python)",
  },
  {
    skillname: "Game Development (Unity, Unreal Engine)",
  },
  {
    skillname: "Operating Systems (Ubuntu, Kali, Windows)",
  },
  {
    skillname: "Audio Designing & Mixing (Ableton live 10)",
  },
  {
    skillname: "Graphic Designing (Blender)",
  },
]

/**
 * Portfolio section
 */
export const portfolioItems: PortfolioItem[] = [
  {
    title: 'Music (Ableton Live 10)',
    description: 'I have a burning passion for music and audio worlds. My latest act in the music scene was Endocrine which released two singles.The latest, A.O.E was published in December 2020 and Red Glow year before that.',
    url: 'https://timbaker.me',
    gitUrl: "https://www.github.com",
    image: porfolioImage1,
    hasGitUrl: true
  },
  {
    title: 'Graphics',
    description: "Here is some screenshots of my Blender and Unreal Engine sessions. The gallery itself is made with ReactJs",
    url: 'https://timbaker.me',
    gitUrl: "https://www.github.com",
    image: porfolioImage2,
    hasGitUrl: true
  },
  {
    title: 'Mr Whobuntu',
    description: 'Mr Whobuntu is for those who seeks to find their real soulmate on this busy world...There is no heart for me like yours',
    url: 'https://timbaker.me',
    gitUrl: 'https://github.com/Hizaguru/Mr-Whobuntu',
    image: porfolioImage3,
  },
  {
    title: 'Fin3Ans',
    description: 'Here is a tool for calculating the returns of your portfolio.',
    url: 'https://github.com/Hizaguru/finance/blob/main/simplereturn/main.py',
    gitUrl: "https://www.github.com",
    image: porfolioImage4,

  },
  {
    title: 'Stealing Time',
    description: '“Stealing Time” gameproject was created in Itcho Gamejam. My part in the project was level designing, audio designing, graphics desining and music.',
    url: 'https://jonnboy91.itch.io/stealing-time',
    image: porfolioImage5,
    hasGitUrl: false
  },
  {
    title: 'Endocrine - Red Glow (Official music video)',
    description: 'I have a burning passion for music and audio worlds. My latest act in the music scene was Endocrine which released two singles.The latest, A.O.E was published in December 2020 and Red Glow year before that.',
    url: 'https://www.youtube.com/watch?v=IonL5jBIxbk',
    image: porfolioImage6,
  },

];

/**
 * Testimonial section
 */
export const testimonial: TestimonialSection = {
  imageSrc: testimonialImage,
  testimonials: [
    {
      name: 'Steve Jobs',
      text: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it.",

    },
    {
      name: "Emo Philips",
      text: "A computer once beat me at chess, but it was no match for me at kick boxing."

    },
    {
      name: 'Craig Bruce',
      text: "It’s hardware that makes a machine fast. It’s software that makes a fast machine slow."

    },
    {
      name: 'Homer Simpson, in response to the message, “Press any key”',
      text: "Where is the ‘any’ key?"
    },
  ],
};

/**
 * Contact section
 */

export const contact: ContactSection = {
  headerText: 'Get in touch.',
  items: [
    {
      type: ContactType.Email,
      text: 'jukka-pekka.lappalainen@jukkis.org',
      href: 'mailto:jukka-pekka.lappalainen@jukkis.org',
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
