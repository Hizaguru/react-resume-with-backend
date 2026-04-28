import Image from 'next/image';
import {FC} from 'react';

type ProfileStickerProps = {
  imageUrl?: string | null;
  alt: string;
  isLoading?: boolean;
  error?: Error | null;
  rotateDeg?: number;
  className?: string;
};

export const ProfileSticker: FC<ProfileStickerProps> = ({
  imageUrl,
  alt,
  isLoading = false,
  error = null,
  rotateDeg = 6,
  className,
}) => {
  const hasImage = Boolean(imageUrl);
  const showPulse = !hasImage && isLoading && !error;
  const showPlaceholder = !hasImage && !isLoading;

  return (
    <div
      className={['relative w-20 sm:w-24 lg:w-28', className].filter(Boolean).join(' ')}
      style={{
        transform: `rotate(${rotateDeg}deg)`,
        filter: 'drop-shadow(0 18px 22px rgba(0,0,0,0.45)) drop-shadow(0 6px 8px rgba(0,0,0,0.35))',
      }}>
      {/* Washi tape strip at top-center */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 -top-[6px] z-10 h-3 w-12 -translate-x-1/2"
        style={{
          background:
            'repeating-linear-gradient(135deg, rgba(254,243,199,0.75) 0px, rgba(254,243,199,0.75) 4px, rgba(253,230,138,0.65) 4px, rgba(253,230,138,0.65) 8px)',
          boxShadow: '0 1px 2px rgba(0,0,0,0.25)',
          opacity: 0.85,
        }}
      />

      {/* Polaroid matte frame */}
      <div
        className="relative rounded-[3px] bg-[#fafaf7] pt-[6px] pr-[6px] pl-[6px] pb-[22px]"
        style={{
          boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.04), 0 1px 0 rgba(255,255,255,0.6) inset',
        }}>
        {/* Photo area */}
        <div className="relative aspect-square w-full overflow-hidden bg-zinc-200">
          {hasImage ? (
            <Image
              alt={alt}
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 112px, (min-width: 640px) 96px, 80px"
              src={imageUrl as string}
            />
          ) : showPulse ? (
            <div aria-hidden="true" className="h-full w-full animate-pulse bg-zinc-300" />
          ) : showPlaceholder || error ? (
            <div
              aria-hidden="true"
              className="flex h-full w-full items-center justify-center border border-dashed border-zinc-400 text-[11px] font-medium uppercase tracking-widest text-zinc-500">
              Photo
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

ProfileSticker.displayName = 'ProfileSticker';

export default ProfileSticker;
