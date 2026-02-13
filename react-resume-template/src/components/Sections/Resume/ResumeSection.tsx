import {FC, memo, PropsWithChildren} from 'react';

const ResumeSection: FC<PropsWithChildren<{title: string}>> = memo(({title, children}) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '1rem',
        paddingTop: '2rem',
        paddingBottom: '2rem',
      }}
      className="resume-section-grid">
      <div className="resume-section-title" style={{display: 'flex', justifyContent: 'center', alignSelf: 'start'}}>
        <div style={{position: 'relative', display: 'inline-block'}}>
          <h2 style={{fontSize: '1.25rem', fontWeight: 700, textTransform: 'uppercase', color: '#262626'}}>{title}</h2>
          <span
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: '-4px',
              borderBottom: '2px solid #f97316',
            }}
          />
        </div>
      </div>
      <div style={{display: 'flex', flexDirection: 'column'}}>{children}</div>
    </div>
  );
});

ResumeSection.displayName = 'ResumeSection';
export default ResumeSection;
