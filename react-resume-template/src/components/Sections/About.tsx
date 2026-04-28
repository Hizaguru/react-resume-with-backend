'use client';

import {useInView} from 'framer-motion';
import {FC, memo, useMemo, useRef} from 'react';

import {urlFor} from '../../client';
import {aboutData, homePageMeta, SectionId} from '../../data/data';
import useProfileImage from '../../hooks/useProfileImage';
import Reveal from '../motion/Reveal';
import {CrtTv} from './About/CrtTv';
import {ProfileSticker} from './About/ProfileSticker';
import {TypingTerminal, type TerminalLine} from './About/TypingTerminal';

const HEADING_ID = 'about-heading';
const PROFILE_ALT = 'Jukka-Pekka Lappalainen';

const splitDescription = (description: string): {lead: string; rest: string} => {
  const trimmed = description.trim();
  const firstBreak = trimmed.indexOf('\n');
  if (firstBreak === -1) return {lead: trimmed, rest: ''};
  return {
    lead: trimmed.slice(0, firstBreak).trim(),
    rest: trimmed.slice(firstBreak).trim(),
  };
};

type Item = {label: string; text: string | number};

// Map aboutItems labels to terminal prefixes. Order here = render order.
const LABEL_TO_PREFIX: Array<{label: string; prefix: string}> = [
  {label: 'Location', prefix: 'location: '},
  {label: 'Age', prefix: 'age:      '},
  {label: 'Study', prefix: 'study:    '},
  {label: 'Employment', prefix: 'role:     '},
];

const buildTerminalLines = (items: Item[], name: string): TerminalLine[] => {
  const byLabel = (label: string): string | undefined => {
    const hit = items.find(i => i.label.toLowerCase() === label.toLowerCase());
    return hit ? String(hit.text) : undefined;
  };

  const lines: TerminalLine[] = [
    {prefix: '> ', text: 'booting phosphor display...'},
    {prefix: '> ', text: 'loading profile...'},
    {prefix: 'name:     ', text: name},
    {prefix: 'alias:    ', text: 'Jukkis'},
  ];

  for (const {label, prefix} of LABEL_TO_PREFIX) {
    const value = byLabel(label);
    if (value) lines.push({prefix, text: value});
  }

  lines.push({prefix: '> ', text: 'status: online.'});
  return lines;
};

const PHOSPHOR_TEXT_SHADOW = '0 0 6px rgba(167,139,250,0.45), 0 0 14px rgba(124,58,237,0.25)';

const About: FC = memo(() => {
  const {description, aboutItems} = aboutData;
  const {lead, rest} = splitDescription(description);
  const tvWrapperRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(tvWrapperRef, {once: true, margin: '-10% 0px -10% 0px'});
  const terminalLines = useMemo(() => buildTerminalLines(aboutItems, homePageMeta.author), [aboutItems]);

  const {image: profileImage, isLoading: profileLoading, error: profileError} = useProfileImage();
  const profileImageUrl = profileImage
    ? urlFor(profileImage.imgUrl).width(280).height(280).fit('crop').auto('format').url()
    : null;

  return (
    <section
      aria-labelledby={HEADING_ID}
      className="relative bg-background py-24 sm:py-32 lg:py-40"
      id={SectionId.About}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">About</p>
          <h2
            className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground"
            id={HEADING_ID}>
            A developer who ships, listens, and iterates.
          </h2>
        </Reveal>

        <div className="mt-16" ref={tvWrapperRef}>
          <Reveal direction="scale" fromScale={0.94}>
            <CrtTv
              sticker={
                <ProfileSticker
                  alt={PROFILE_ALT}
                  error={profileError}
                  imageUrl={profileImageUrl}
                  isLoading={profileLoading}
                />
              }>
              <div className="grid h-full w-full grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
                <div className="order-1 flex flex-col justify-center lg:order-1">
                  <p
                    className="text-base sm:text-lg lg:text-xl leading-relaxed font-medium"
                    style={{
                      color: '#f5f3ff',
                      textShadow: PHOSPHOR_TEXT_SHADOW,
                      whiteSpace: 'pre-line',
                    }}>
                    {lead}
                  </p>
                  {rest ? (
                    <p
                      className="mt-4 text-sm sm:text-base leading-relaxed"
                      style={{
                        color: '#e9d7ff',
                        textShadow: PHOSPHOR_TEXT_SHADOW,
                        whiteSpace: 'pre-line',
                      }}>
                      {rest}
                    </p>
                  ) : null}
                </div>
                <div className="order-2 flex items-start justify-start overflow-hidden text-left font-mono text-xs sm:text-sm lg:order-2">
                  <TypingTerminal className="w-full" lines={terminalLines} start={inView} />
                </div>
              </div>
            </CrtTv>
          </Reveal>
        </div>
      </div>
    </section>
  );
});

About.displayName = 'About';
export default About;
