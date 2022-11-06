import {
  AcademicCapIcon,
  CalendarIcon, MapIcon,
  OfficeBuildingIcon
} from '@heroicons/react/outline';
import getAge from '../functions/calculateMyAge';
import GithubIcon from '../components/Icon/GithubIcon';
import LinkedInIcon from '../components/Icon/LinkedInIcon';

import porfolioImage1 from '../images/portfolio/portfolio-1.webp';
import porfolioImage2 from '../images/portfolio/portfolio-2.webp';
import porfolioImage3 from '../images/portfolio/portfolio-3.webp';
import porfolioImage4 from '../images/portfolio/portfolio-4.webp';
import porfolioImage5 from '../images/portfolio/portfolio-5.webp';
import porfolioImage6 from '../images/portfolio/portfolio-6.webp';
import porfolioImage7 from '../images/portfolio/portfolio-7.webp';
import designImg from '../images/designing.webp';
import mixingBoard from '../images/mixing-board.webp';
import testimonialImage from '../images/testimonial.webp';
import loveImage from '../images/love.webp';
import richImage from '../images/rich.webp';
import gameJamImage from '../images/Gamejam.webp';
import musicVideoImage from '../images/music-video.webp';
import flaskImage from '../images/flask.webp';

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
  title: 'Jukkis\' portfolio',
  description: 'Portfolio build with React typescript',
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
        A Finland based <strong className="text-stone-100">Full Stack Software Engineer, audio </strong>and
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
    { label: 'Age', text: getAge('05/25/1988'), Icon: CalendarIcon },
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
export const portfolioItems: PortfolioItem[] = [
  {
    title: 'PyEnd',
    description: 'Python Flask',
    url: 'https://github.com/Hizaguru/PyEnd',
    imgUrl: porfolioImage7,
    modalTitle: 'PyEnd',
    modalDescription: 'Here\'s the backend for handling the images on your webapp. Just install the MySql database, follow the instructions and fire it up.',
    modalImgUrl: flaskImage,
  },
  {
    title: 'Music/Mixing',
    description: 'Ableton Live 10',
    url: 'https://jukkis.org/index2.html',
    imgUrl: porfolioImage1,
    modalTitle: 'Mixing',
    modalDescription: 'I\'ve got a burning passion for music and audio worlds. I\'ve been playing in dozens of bands with different genres. My latest act in the music scene was Endocrine which released two singles.',
    modalImgUrl: mixingBoard
  },
  {
    title: 'Graphic Designing',
    description: 'Blender | Unreal Engine | Unity',
    url: 'https://www.jukkis.org/gallery/',
    imgUrl: porfolioImage2,
    modalTitle: 'Graphic Designing',
    modalDescription: 'One of my favorite free time hobbies is playing with Blender and different game engines, such as Unreal Engine or Unity. The gallery itself is built with ReactJS.',
    modalImgUrl: designImg,
    gitUrl: 'https://github.com/Hizaguru/img-carousel-with-backend/tree/implement-the-backend'
  },
  {
    title: 'Mr Whobuntu',
    description: 'Python',
    url: 'https://github.com/Hizaguru/Mr-Whobuntu',
    imgUrl: porfolioImage3,
    modalTitle: 'Mr Whobuntu',
    modalDescription: 'Mr Whobuntu is for those who seeks to find their real soulmate in this busy world... The project never got finished, but it was a good start to get known into automation and machine learning.',
    modalImgUrl: loveImage,
  },
  {
    title: 'Fin3Ans',
    description: 'Python',
    url: 'https://github.com/Hizaguru/finance/blob/main/simplereturn/main.py',
    imgUrl: porfolioImage4,
    modalTitle: 'F1n3Ans',
    modalDescription: 'A tool for calculating the returns of your portfolio. The project was made with Python\'s Numby, Pandas and Scumby libraries and is still in progress.',
    modalImgUrl: richImage,
  },
  {
    title: 'Stealing Time',
    description: 'Unity',
    url: 'https://jonnboy91.itch.io/stealing-time',
    imgUrl: porfolioImage5,
    modalTitle: 'Stealing Time',
    modalDescription: '“Stealing Time” gameproject was created in Itcho Gamejam. My part in the project was level designing, audio designing, graphics desining and music. You can try the game from the button below. Enjoy!',
    modalImgUrl: gameJamImage,
  },
  {
    title: 'Endocrine - Red Glow (Music video)',
    description: 'Adobe Premiere',
    url: 'https://www.youtube.com/watch?v=IonL5jBIxbk',
    imgUrl: porfolioImage6,
    modalTitle: 'Endocrine - Red Glow (Official music video)',
    modalDescription: 'One of my favourite music projects of all time. Endocrine released two singles and one music video. I was primarily responsible for directing, producing, songwriting, mixing and editing.',
    modalImgUrl: musicVideoImage,
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
