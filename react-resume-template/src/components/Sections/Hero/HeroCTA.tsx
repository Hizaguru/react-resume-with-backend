import {FC} from 'react';

import MagneticButton from '../../motion/MagneticButton';

const HeroCTA: FC = () => {
  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
      <MagneticButton
        className="bg-primary text-white hover:bg-primary/90 shadow-[0_8px_24px_-12px_rgba(79,70,229,0.6)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        href="#projects"
        size="lg"
        variant="default">
        See my work
      </MagneticButton>
      <MagneticButton
        className="bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.25)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        href="#contact"
        size="lg"
        variant="secondary">
        Contact me
      </MagneticButton>
    </div>
  );
};

HeroCTA.displayName = 'HeroCTA';

export default HeroCTA;
