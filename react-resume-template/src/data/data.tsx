import {
  ChatBubbleLeftRightIcon,
  CloudIcon,
  CodeBracketIcon,
  CommandLineIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';
import GithubIcon from '../components/Icon/GithubIcon';
import LinkedInIcon from '../components/Icon/LinkedInIcon';

import {
  About,
  ContactSection,
  ContactType,
  FAQItem,
  Hero,
  HomepageMeta,
  ProcessStep,
  ServiceItem,
  Social,
  TechCategory,
  TestimonialSection,
  TrustSignal,
  ValueProp,
} from './dataDef';

/**
 * Page meta data
 */
export const homePageMeta: HomepageMeta = {
  title: 'Perttula Software — Fullstack Development for Startups & Businesses | Nurmijärvi, Finland',
  description:
    'Perttula Software is a fullstack development consultancy based in Nurmijärvi, Finland. Custom web applications, backend systems, AI integrations, and ongoing maintenance for startups, agencies, and local businesses.',
  author: 'Jukka-Pekka Lappalainen',
  keywords:
    'Perttula Software, Jukka-Pekka Lappalainen, fullstack developer, web development Finland, software consultant Nurmijärvi, React developer, TypeScript, Node.js, AI development, startup developer, freelance developer Finland',
  ogImageUrl: 'https://www.jukkis.eu/api/og',
};

/**
 * Section definition
 */
export const SectionId = {
  Hero: 'hero',
  About: 'about',
  Contact: 'contact',
  Portfolio: 'portfolio',
  Resume: 'skills',
  Stats: 'stats',
  Testimonials: 'testimonials',
  Services: 'services',
  Process: 'process',
  FAQ: 'faq',
} as const;

export type SectionId = (typeof SectionId)[keyof typeof SectionId];

/**
 * Hero section
 */
export const heroData: Hero = {
  name: 'Perttula Software',
  headline: 'I build the software your business runs on.',
  subheadline:
    'Fullstack development for startups, agencies, and local businesses. One senior developer. Architecture to deployment. No overhead.',
  description: (
    <>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        Fullstack development for startups, agencies, and local businesses. One senior developer. Architecture to
        deployment. No overhead.
      </p>
    </>
  ),
  actions: [
    {
      href: `#${SectionId.Contact}`,
      text: "Let's discuss your project",
      primary: true,
    },
  ],
};

/**
 * About section
 */
export const aboutData: About = {
  description:
    'Jukka-Pekka Lappalainen is the developer behind Perttula Software — a fullstack development consultancy based in Nurmijärvi, Finland. With a background spanning web development, systems programming, infrastructure, and AI, he builds and maintains production software for startups, agencies, and local businesses. He works across the entire stack — frontend to backend to deployment — so clients get one point of contact who understands their whole system.',
};

/**
 * Services section
 */
export const services: ServiceItem[] = [
  {
    icon: CodeBracketIcon,
    title: 'Web Applications',
    description: 'Custom web apps built with React, Next.js, and TypeScript. Responsive, fast, accessible.',
  },
  {
    icon: CommandLineIcon,
    title: 'Backend & API Development',
    description:
      'Server-side systems, REST and GraphQL APIs, database design. Node.js, Java, or whatever the problem requires.',
  },
  {
    icon: CpuChipIcon,
    title: 'AI Integrations & Agents',
    description: 'Custom AI agent workflows, LLM integrations, and automation built into your existing systems.',
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: 'MVP Development',
    description:
      "Get from idea to working product fast. Architecture that scales when you need it to, lean when you don't.",
  },
  {
    icon: CloudIcon,
    title: 'Infrastructure & DevOps',
    description:
      'AWS deployment, Docker containerization, CI/CD pipelines, monitoring. Your code runs reliably in production.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Testing & Quality',
    description: 'Automated testing with Playwright, Vitest, and Jest. Code that works and keeps working.',
  },
  {
    icon: WrenchScrewdriverIcon,
    title: 'Maintenance & Support',
    description:
      'Ongoing development, bug fixes, performance optimization, and technical support for existing applications.',
  },
];

/**
 * Process steps
 */
export const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: 'Conversation',
    description:
      'You tell me what you need. I ask the right questions. We figure out if it\'s a good fit — no obligation, no sales pitch.',
  },
  {
    number: 2,
    title: 'Scope & estimate',
    description:
      "I break the project into concrete deliverables with clear timelines and honest estimates. You know what you're getting and when.",
  },
  {
    number: 3,
    title: 'Build',
    description:
      'I design, develop, and test the solution. You get regular updates and working demos — not status reports about status reports.',
  },
  {
    number: 4,
    title: 'Ship',
    description:
      'Deployment to production with proper infrastructure, monitoring, and documentation. It works on day one.',
  },
  {
    number: 5,
    title: 'Support',
    description:
      "Bug fixes, iterations, and ongoing maintenance. The project doesn't end at launch.",
  },
];

/**
 * FAQ items
 */
export const faqItems: FAQItem[] = [
  {
    question: 'What types of projects do you take on?',
    answer:
      'Web applications, backend systems, APIs, AI integrations, MVPs, and ongoing maintenance. If it involves code and a business need, we should talk.',
  },
  {
    question: 'How do you handle projects that are too large for one person?',
    answer:
      "Most projects aren't. But when they are, I'm upfront about it. I'll tell you if a project needs more people and help you find the right team — I won't take on work I can't deliver.",
  },
  {
    question: 'What does a typical engagement look like?',
    answer:
      'It starts with a conversation. I scope the work, give you an honest estimate, and build in milestones so you see progress throughout. No disappearing for three months.',
  },
  {
    question: 'Do you work on-site or remotely?',
    answer:
      'Primarily remote, but available for on-site meetings in the Nurmijärvi / Helsinki metropolitan area.',
  },
  {
    question: 'How do you charge?',
    answer:
      "Project-based or hourly, depending on the work. We'll figure out what makes sense after the initial conversation. No surprises.",
  },
  {
    question: 'Can you work with my existing codebase?',
    answer:
      'Yes. I regularly work with existing systems — debugging, refactoring, adding features, or migrating to better infrastructure.',
  },
  {
    question: 'What if I need ongoing support after the project?',
    answer:
      "I offer maintenance agreements. Your software doesn't stop needing attention after launch.",
  },
];

/**
 * Trust signals
 */
export const trustSignals: TrustSignal[] = [
  {metric: '4+', label: 'Years in production development'},
  {metric: '10+', label: 'Projects shipped'},
  {metric: '7', label: 'Technology categories'},
  {metric: '100%', label: 'Direct client access'},
];

/**
 * Value propositions
 */
export const valueProps: ValueProp[] = [
  {
    title: 'Direct access',
    description: 'You talk to the developer. Every question gets a technical answer, not a filtered status update.',
  },
  {
    title: 'Full-stack ownership',
    description:
      'One person builds your frontend, API, database, CI/CD, and deployment. No gaps between layers.',
  },
  {
    title: 'Lean and fast',
    description: 'No standups about standups. No process overhead. Requirements in, working software out.',
  },
];

/**
 * Tech stack organized by category
 */
export const techStack: TechCategory[] = [
  {category: 'Frontend', technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS']},
  {category: 'Backend', technologies: ['Node.js', 'Java', 'Express', 'REST', 'GraphQL']},
  {category: 'Systems & Performance', technologies: ['C++', 'Unreal Engine']},
  {category: 'AI & Automation', technologies: ['AI Agents', 'LLM integrations']},
  {category: 'Infrastructure', technologies: ['AWS', 'Docker', 'Linux', 'Bash', 'CI/CD']},
  {category: 'Databases', technologies: ['MySQL', 'NoSQL (MongoDB, DynamoDB)']},
  {category: 'Testing', technologies: ['Playwright', 'Vitest', 'Jest', 'JUnit']},
];

/**
 * Testimonial section — intentionally empty until real client testimonials are available.
 * The Testimonials component renders nothing when this array is empty.
 */
export const testimonial: TestimonialSection = {
  testimonials: [],
};

/**
 * Contact section
 */
export const contact: ContactSection = {
  headerText: "Let's build something.",
  alert: 'Error occurred, please try again later',
  messageSent: "Thank you for your message. I'll get back to you within one business day.",
  items: [
    {
      type: ContactType.Email,
      text: 'jukka-pekka.lappalainen@outlook.com',
      href: 'mailto:jukka-pekka.lappalainen@outlook.com',
    },
    {
      type: ContactType.Location,
      text: 'Nurmijärvi, Finland',
      href: 'https://goo.gl/maps/Nurmijarvi',
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
  {label: 'Github', Icon: GithubIcon, href: 'https://github.com/Hizaguru'},
  {label: 'LinkedIn', Icon: LinkedInIcon, href: 'https://www.linkedin.com/in/jukka-pekka-lappalainen-0365001a7/'},
];
