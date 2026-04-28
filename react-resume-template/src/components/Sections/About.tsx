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

const buildDescriptionLines = (lead: string, rest: string): TerminalLine[] => {
  const normalizeParagraph = (p: string): string => p.replace(/\s+/g, ' ').trim();
  const paragraphs: string[] = [];
  const leadClean = normalizeParagraph(lead);
  if (leadClean) paragraphs.push(leadClean);
  if (rest) {
    rest
      .split(/\n{2,}/)
      .map(normalizeParagraph)
      .filter(Boolean)
      .forEach(p => paragraphs.push(p));
  }
  // Insert a blank line between paragraphs for visual breathing room.
  const lines: TerminalLine[] = [];
  paragraphs.forEach((p, i) => {
    if (i > 0) lines.push({text: ''});
    lines.push({text: p});
  });
  return lines;
};

const About: FC = memo(() => {
  const {description, aboutItems} = aboutData;
  const {lead, rest} = splitDescription(description);
  const tvWrapperRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(tvWrapperRef, {margin: '-10% 0px -10% 0px'});
  const unifiedLines = useMemo<TerminalLine[]>(() => {
    const info = buildTerminalLines(aboutItems, homePageMeta.author);
    const body = buildDescriptionLines(lead, rest);
    // Blank separator gives visual breathing room between the info block and
    // the prose. It renders as an empty row (zero-width-space in TypingTerminal
    // keeps its height).
    return [...info, {text: ''}, ...body];
  }, [aboutItems, lead, rest]);

  const {image: profileImage, isLoading: profileLoading, error: profileError} = useProfileImage();
  const profileImageUrl = profileImage
    ? urlFor(profileImage.imgUrl).width(280).height(280).fit('crop').auto('format').url()
    : null;

  return (
    <section
      aria-labelledby={HEADING_ID}
      className="relative overflow-x-clip bg-background py-24 sm:py-32 lg:py-40"
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
              <div className="h-full w-full overflow-hidden text-left">
                <TypingTerminal
                  autoScroll
                  charsPerSecond={45}
                  className="h-full w-full"
                  lineDelay={0.5}
                  lines={unifiedLines}
                  start={inView}
                />
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
