import { FC, memo } from 'react';


import { SectionId, skills } from '../../../data/data';
import Section from '../../Layout/Section';
import ResumeSection from './ResumeSection';


const Resume: FC = memo(() => {

  return (
    <Section className="bg-neutral-100" sectionId={SectionId.Resume}>
      <div className="flex flex-col divide-y-2 divide-neutral-300">
        <ResumeSection title="Skills">
          <ul className='lg:text-2xl sm:text-xl md:text-left text-center lg:text-left'>
            {skills &&
              skills.map((item) => {
                return (
                  <li key={item.skillname} className='p-3'>
                    <span className={item.skillname.toLowerCase()} />
                    <em>{item.skillname}</em>
                    <hr className=' md:w-1/2 lg:w-3/5 mt-6' />
                  </li>
                );
              })}
          </ul>
        </ResumeSection>
      </div >
    </Section >
  );
});

Resume.displayName = 'Resume';
export default Resume;
