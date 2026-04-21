import Image from 'next/image';
import { FC, memo } from 'react';

import { urlFor } from '../../client';
import { aboutData, SectionId } from '../../data/data';
import useProfileImage from '../../hooks/useProfileImage';
import MotionFadeIn from '../motion/MotionFadeIn';
import TypewriterText from '../motion/TypewriterText';

const HEADING_ID = 'about-heading';

const splitDescription = (description: string): {lead: string; rest: string} => {
  const trimmed = description.trim();
  const firstBreak = trimmed.indexOf('\n');
  if (firstBreak === -1) return {lead: trimmed, rest: ''};
  return {
    lead: trimmed.slice(0, firstBreak).trim(),
    rest: trimmed.slice(firstBreak).trim(),
  };
};

const Portrait: FC<{imageUrl: string | null; isLoading: boolean; error: Error | null}> = ({
  imageUrl,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return <div className="aspect-square w-full max-w-sm rounded-full bg-muted animate-pulse mx-auto" />;
  }
  if (error || !imageUrl) {
    return (
      <div
        className="aspect-square w-full max-w-sm mx-auto flex items-center justify-center rounded-full border border-dashed border-border text-sm text-muted-foreground"
        role="alert">
        Portrait unavailable
      </div>
    );
  }
  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div className="absolute inset-0 -z-10 rounded-full bg-primary/20 blur-2xl scale-95" aria-hidden="true" />
      <div className="relative aspect-square w-full overflow-hidden rounded-full border border-border bg-muted shadow-lg ring-1 ring-border/60">
        <Image
          alt="Jukka-Pekka Lappalainen profile photo"
          className="object-cover"
          fill
          sizes="(min-width:1024px) 40vw, 90vw"
          src={imageUrl}
        />
      </div>
    </div>
  );
};

const About: FC = memo(() => {
  const {description, aboutItems} = aboutData;
  const {image, isLoading, error} = useProfileImage();
  const {lead, rest} = splitDescription(description);
  const imageUrl = image ? urlFor(image.imgUrl).url() : null;

  return (
    <section
      aria-labelledby={HEADING_ID}
      className="relative bg-background py-24 sm:py-32 lg:py-40"
      id={SectionId.About}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <MotionFadeIn>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">About</p>
          <h2
            className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground"
            id={HEADING_ID}>
            <TypewriterText
              ariaLabel="A developer who ships, listens, and iterates."
              caretClassName="text-primary"
              charDelay={35}
              segments={[{text: 'A developer who ships, listens, and iterates.'}]}
            />
          </h2>
        </MotionFadeIn>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <MotionFadeIn>
              <Portrait error={error} imageUrl={imageUrl} isLoading={isLoading} />
            </MotionFadeIn>
          </div>

          <div className="lg:col-span-7">
            <MotionFadeIn delay={0.05}>
              <p
                className="text-xl sm:text-2xl leading-relaxed text-foreground font-medium"
                style={{whiteSpace: 'pre-line'}}>
                {lead}
              </p>
            </MotionFadeIn>
            {rest ? (
              <MotionFadeIn delay={0.1}>
                <p
                  className="mt-6 text-base leading-relaxed text-muted-foreground"
                  style={{whiteSpace: 'pre-line'}}>
                  {rest}
                </p>
              </MotionFadeIn>
            ) : null}

            <dl className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 border-t border-border pt-10">
              {aboutItems.map(({label, text, Icon}, i) => (
                <MotionFadeIn delay={i * 0.05} key={label + text}>
                  <div className="flex flex-col gap-1">
                    <dt className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                      {label}
                    </dt>
                    <dd className="flex items-start gap-2 text-sm text-foreground">
                      {Icon ? <Icon className="h-4 w-4 mt-0.5 shrink-0 text-primary" /> : null}
                      <span className="break-words">{text}</span>
                    </dd>
                  </div>
                </MotionFadeIn>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
});

About.displayName = 'About';
export default About;

