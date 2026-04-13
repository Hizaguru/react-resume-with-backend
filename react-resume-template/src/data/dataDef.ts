import {StaticImageData} from 'next/image';
import {ComponentType, FC, SVGProps} from 'react';

import {IconProps} from '../components/Icon/Icon';

export interface HomepageMeta {
  title: string;
  description: string;
  author: string;
  keywords: string;
  ogImageUrl?: string;
  children?: any;
}

//Portfolio image section
export interface SanityImage {
  _id: string;
  _createdAt: string;
  name: string;
  imgUrl: {
    asset: {
      url: string;
    };
  };
}

/**
 * Hero section
 */
export interface Hero {
  imageSrc?: string | SanityImage[];
  name: string;
  headline: string;
  subheadline: string;
  description: React.JSX.Element;
  actions: HeroActionItem[];
}

interface HeroActionItem {
  href: string;
  text: string;
  primary?: boolean;
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
}

/**
 * About section
 */
export interface About {
  profileImageSrc?: string | SanityImage[];
  description: string;
}

/**
 * Service item
 */
export interface ServiceItem {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

/**
 * Process step
 */
export interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

/**
 * FAQ item
 */
export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Trust signal
 */
export interface TrustSignal {
  metric: string;
  label: string;
}

/**
 * Value proposition
 */
export interface ValueProp {
  title: string;
  description: string;
}

/**
 * Tech category
 */
export interface TechCategory {
  category: string;
  technologies: string[];
}

/**
 * Stat section
 */
export interface Stat {
  title: string;
  value: number;
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
}

/**
 * Skills section
 */

export interface Skill {
  name: string;
  level: number;
  max?: number;
}

export interface SkillGroup {
  name: string;
  skills: Skill[];
}

export interface Skills {
  skillname: string;
}

/**
 * Portfolio section
 */
export interface PortfolioItem {
  title: string;
  description: string;
  url?: string;
  gitUrl?: string;
  imgUrl: string | StaticImageData | SanityImage[];
  modalTitle: string;
  modalDescription?: string;
  modalImgUrl?: string | StaticImageData | SanityImage[];
  _updatedAt: any;
}

/**
 * Resume section
 */
export interface TimelineItem {
  date: string;
  location: string;
  title: string;
  content: React.JSX.Element;
}

/**
 * Testimonial section
 */
export interface TestimonialSection {
  imageSrc?: string | StaticImageData;
  testimonials: Testimonial[];
}

export interface Testimonial {
  name: string;
  text: string;
}

/**
 * Contact section
 */
export interface ContactSection {
  headerText?: string;
  items: ContactItem[];
  alert?: string;
  messageSent?: string;
}

export const ContactType = {
  Email: 'Email',
  Phone: 'Phone',
  Location: 'Location',
  Github: 'Github',
  LinkedIn: 'LinkedIn',
} as const;

export type ContactType = (typeof ContactType)[keyof typeof ContactType];

export interface ContactItem {
  type: ContactType;
  text: string;
  href?: string;
}

export interface ContactValue {
  Icon: FC<IconProps> | ((props: SVGProps<SVGSVGElement>) => React.JSX.Element);
  srLabel: string;
}

/**
 * Social items
 */
export interface Social {
  label: string;
  Icon: FC<IconProps>;
  href: string;
}
