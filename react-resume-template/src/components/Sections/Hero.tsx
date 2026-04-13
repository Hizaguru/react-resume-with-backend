import Image from 'next/image';
import {FC, memo} from 'react';

import {heroData, SectionId} from '../../data/data';
import Section from '../Layout/Section';

const Hero: FC = memo(() => {
  const {headline, subheadline, actions} = heroData;

  return (
    <Section noPadding sectionId={SectionId.Hero}>
      <div className="relative flex min-h-screen w-full items-center overflow-hidden">
        {/* Background image */}
        <Image
          alt="Programmer workstation in misty forest"
          className="object-cover object-center"
          fill
          priority
          quality={90}
          sizes="100vw"
          src="/images/hero-bg.png"
        />

        {/* Dark overlay for text readability */}
        <div className="pointer-events-none absolute inset-0 bg-black/50" />

        {/* Fog layer 1 — slow, bottom-heavy */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 animate-fog-1"
          style={{
            background: 'radial-gradient(ellipse 120% 60% at 20% 90%, rgba(200,210,220,0.4) 0%, transparent 70%)',
          }}
        />

        {/* Fog layer 2 — mid, drifts opposite */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 animate-fog-2"
          style={{
            background: 'radial-gradient(ellipse 100% 50% at 70% 85%, rgba(180,195,210,0.3) 0%, transparent 65%)',
          }}
        />

        {/* Fog layer 3 — wispy top layer */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-1/4 h-1/3 animate-fog-3"
          style={{
            background: 'radial-gradient(ellipse 80% 40% at 50% 80%, rgba(220,225,230,0.2) 0%, transparent 60%)',
          }}
        />

        {/* Bottom gradient fade to primary-bg */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-primary-bg to-transparent" />

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-content px-6 py-32 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-y-8">
            {/* Animated accent line */}
            <div className="h-px w-0 animate-line-expand bg-gradient-to-r from-accent to-accent-hover" />

            <h1 className="max-w-3xl animate-fade-up font-sans text-4xl font-bold leading-tight tracking-tight text-white opacity-0 drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl">
              {headline}
            </h1>
            <p className="max-w-2xl animate-fade-up-delay-1 text-lg leading-relaxed text-neutral-200 opacity-0 drop-shadow-md sm:text-xl">
              {subheadline}
            </p>
            <div className="flex animate-fade-up-delay-2 flex-wrap gap-4 pt-4 opacity-0">
              {actions.map(({href, text, primary}) => (
                <a
                  className={
                    primary
                      ? 'inline-flex rounded-md bg-accent px-8 py-3.5 text-base font-medium text-white shadow-lg shadow-accent/25 transition-all duration-300 hover:bg-accent-hover hover:shadow-xl hover:shadow-accent/30 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-black/50'
                      : 'inline-flex rounded-md border border-white/40 bg-white/10 px-8 py-3.5 text-base font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white/70 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/50'
                  }
                  href={href}
                  key={text}>
                  {text}
                </a>
              ))}
            </div>

            {/* Scroll indicator */}
            <div className="animate-fade-up-delay-3 pt-8 opacity-0">
              <div className="flex flex-col items-start gap-2">
                <span className="text-xs font-medium uppercase tracking-widest text-neutral-300 drop-shadow">Scroll</span>
                <div className="h-12 w-px bg-gradient-to-b from-white/60 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
});

Hero.displayName = 'Hero';
export default Hero;
