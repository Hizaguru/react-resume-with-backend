import {FC, memo} from 'react';

// NOTE: The previous Hero pulled a `header` image from Sanity via `client.fetch`.
// The new design uses a generated animated gradient background instead, so that
// integration is deprecated here. Keep the Sanity `header` schema in the CMS
// until we decide whether to reuse it elsewhere.
// import {client, urlFor} from '../../../client';

import {SectionId} from '../../../data/data';

import AnimatedGradientBg from './AnimatedGradientBg';
import HeroCTA from './HeroCTA';
import HeroHeadline from './HeroHeadline';

const Hero: FC = memo(() => {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-background"
      id={SectionId.Hero}>
      <AnimatedGradientBg />
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <div id="hero-heading">
          <HeroHeadline />
        </div>
        <HeroCTA />
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
