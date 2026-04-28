import {FC} from 'react';
import {BsAnthropic, BsOpenai} from 'react-icons/bs';
import {FaAws, FaFilm, FaJava, FaNodeJs, FaReact} from 'react-icons/fa6';
import {GoCopilot} from 'react-icons/go';
import {
  SiGithubactions,
  SiJest,
  SiLangchain,
  SiPython,
  SiSpringboot,
  SiTailwindcss,
  SiTypescript,
  SiUnity,
  SiUnrealengine,
  SiVite,
  SiVitest,
} from 'react-icons/si';
import {TbShieldLock} from 'react-icons/tb';
import {VscBeaker, VscGitPullRequest} from 'react-icons/vsc';

import ExpertiseTile from '../ExpertiseTile';

type IconComponent = FC<{className?: string; 'aria-hidden'?: boolean}>;

interface Skill {
  name: string;
  Icon: IconComponent;
  color: string; // brand-tinted tailwind color class
}

interface SkillCategory {
  title: string;
  skills: readonly Skill[];
}
const CATEGORIES: readonly SkillCategory[] = [
  {
    title: 'Frontend',
    skills: [
      {name: 'TypeScript', Icon: SiTypescript, color: 'text-[#3178C6]'},
      {name: 'React', Icon: FaReact, color: 'text-[#61DAFB]'},
      {name: 'Vite', Icon: SiVite, color: 'text-[#646CFF]'},
      {name: 'Tailwind CSS', Icon: SiTailwindcss, color: 'text-[#06B6D4]'},
    ],
  },
  {
    title: 'Backend',
    skills: [
      {name: 'Java', Icon: FaJava, color: 'text-[#E76F00]'},
      {name: 'Spring Boot', Icon: SiSpringboot, color: 'text-[#6DB33F]'},
      {name: 'Python', Icon: SiPython, color: 'text-[#3776AB]'},
      {name: 'Node.js', Icon: FaNodeJs, color: 'text-[#339933]'},
    ],
  },
  {
    title: 'Cloud & DevOps',
    skills: [
      {name: 'AWS', Icon: FaAws, color: 'text-[#FF9900]'},
      {name: 'GitHub Actions', Icon: SiGithubactions, color: 'text-[#2088FF]'},
      {name: 'CI/CD', Icon: VscGitPullRequest, color: 'text-primary'},
      {name: 'OIDC / IAM', Icon: TbShieldLock, color: 'text-[#FF9900]'},
    ],
  },
  {
    title: 'Testing & Quality',
    skills: [
      {name: 'Playwright', Icon: VscBeaker, color: 'text-[#2EAD33]'},
      {name: 'Vitest', Icon: SiVitest, color: 'text-[#6E9F18]'},
      {name: 'Jest', Icon: SiJest, color: 'text-[#C21325]'},
    ],
  },
  {
    title: 'AI & Automation',
    skills: [
      {name: 'LLM APIs', Icon: BsOpenai, color: 'text-[#10A37F]'},
      {name: 'LangChain', Icon: SiLangchain, color: 'text-[#1C3C3C]'},
      {name: 'GitHub Copilot', Icon: GoCopilot, color: 'text-foreground'},
      {name: 'Claude Code', Icon: BsAnthropic, color: 'text-[#D97757]'},
    ],
  },
  {
    title: 'Creative & Game Projects',
    skills: [
      {name: 'Unreal Engine', Icon: SiUnrealengine, color: 'text-foreground'},
      {name: 'Unity', Icon: SiUnity, color: 'text-foreground'},
      {name: 'Adobe Premiere', Icon: FaFilm, color: 'text-[#9999FF]'},
    ],
  },
] as const;

const SkillCard: FC<{skill: Skill}> = ({skill}) => {
  const {name, Icon, color} = skill;
  return (
    <div className="group/skill relative flex items-center gap-3 rounded-xl border border-border bg-background/60 p-4 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_8px_24px_-12px_rgba(124,58,237,0.35)]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted ring-1 ring-border transition-colors duration-200 group-hover/skill:bg-background">
        <Icon aria-hidden className={`h-6 w-6 ${color}`} />
      </div>
      <p className="text-sm font-semibold tracking-tight text-foreground">{name}</p>
    </div>
  );
};

SkillCard.displayName = 'SkillCard';

const SkillsGridTile: FC = () => {
  return (
    <ExpertiseTile eyebrow="Stack" title="A constellation, not a checklist.">
      <div className="flex flex-col gap-8">
        {CATEGORIES.map(category => (
          <div key={category.title}>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{category.title}</p>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {category.skills.map(skill => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </ExpertiseTile>
  );
};

SkillsGridTile.displayName = 'SkillsGridTile';

export default SkillsGridTile;
