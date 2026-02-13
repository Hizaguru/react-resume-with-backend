import {FC, memo} from 'react';

import {SectionId, skills} from '../../../data/data';
import Section from '../../Layout/Section';
import ResumeSection from './ResumeSection';

const Resume: FC = memo(() => {
  return (
    <Section className="bg-neutral-100" sectionId={SectionId.Resume}>
      <div className="flex flex-col divide-y-2 divide-neutral-300">
        <ResumeSection title="Skills">
          <ul className="skills-list" style={{fontSize: '1.5rem'}}>
            {skills?.map(item => {
              return (
                <li key={item.skillname} style={{padding: '0.75rem 0'}}>
                  <span className={item.skillname.toLowerCase()} />
                  <em>{item.skillname}</em>
                  <hr
                    style={{
                      width: '60%',
                      marginTop: '1rem',
                      border: 'none',
                      borderTop: '1px solid #d4d4d4',
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </ResumeSection>
      </div>
    </Section>
  );
});

Resume.displayName = 'Resume';
export default Resume;
