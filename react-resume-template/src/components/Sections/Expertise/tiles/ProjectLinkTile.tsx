import {ArrowRight} from 'lucide-react';
import {FC} from 'react';

import ExpertiseTile from '../ExpertiseTile';

const ProjectLinkTile: FC = () => {
  return (
    <ExpertiseTile
      as="a"
      className="flex-row items-center justify-between"
      eyebrow="Proof"
      href="#projects"
      title="See the work behind the words">
      <div className="flex items-center justify-end">
        <ArrowRight aria-hidden="true" className="size-5 text-primary transition-transform group-hover:translate-x-1" />
      </div>
    </ExpertiseTile>
  );
};

ProjectLinkTile.displayName = 'ProjectLinkTile';

export default ProjectLinkTile;
