import {motion, useReducedMotion} from 'framer-motion';
import {FC, ReactNode} from 'react';

type CrtTvProps = {
  children: ReactNode;
  className?: string;
  /**
   * Optional decoration (e.g. polaroid photo) rendered on the bezel,
   * absolute-positioned in the top-right, overlapping the screen edge slightly
   * so it reads as an actual stuck-on sticker. Rendered outside the glass.
   */
  sticker?: ReactNode;
};

/**
 * CrtTv — a decorative picture-tube TV frame that wraps arbitrary content
 * inside a curved, phosphor-glowing CRT screen. All chrome (bezel, labels,
 * screws, scanlines, vignette, flicker) is aria-hidden.
 */
export const CrtTv: FC<CrtTvProps> = ({
  children,
  className,
  sticker,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={['relative mx-auto w-full select-none', className].filter(Boolean).join(' ')}>
      {/* Ambient violet phosphor wash behind the whole set — sells the glow in dark mode */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[56px] bg-[radial-gradient(ellipse_at_center,rgba(167,139,250,0.28),transparent_65%)] blur-3xl"
      />

      {/* Outer bezel — dark plastic, subtly beveled */}
      <div
        className="relative rounded-[28px] p-5 sm:rounded-[32px] sm:p-10 md:p-12"
        style={{
          background: 'linear-gradient(155deg, #2a2a2e 0%, #1a1a1d 35%, #121214 70%, #0e0e10 100%)',
          boxShadow: [
            'inset 0 2px 1px rgba(255,255,255,0.08)',
            'inset 0 -3px 3px rgba(0,0,0,0.65)',
            'inset 0 0 0 1px rgba(0,0,0,0.6)',
            '0 50px 90px -30px rgba(0,0,0,0.85)',
            '0 20px 50px -20px rgba(124,58,237,0.22)',
          ].join(', '),
        }}>
        {/* Picture tube wrapper — inset frame around the glass (the "CRT front mask") */}
        <div
          className="relative rounded-[20px] p-2.5 sm:rounded-[24px] sm:p-5 md:p-6"
          style={{
            background: 'linear-gradient(175deg, #0a0a0b 0%, #050506 60%, #000 100%)',
            boxShadow: [
              'inset 0 3px 6px rgba(0,0,0,0.92)',
              'inset 0 0 0 1px rgba(255,255,255,0.05)',
              'inset 0 -1px 2px rgba(255,255,255,0.03)',
            ].join(', '),
          }}>
          {/* Glass screen surface */}
          <div
            className="relative aspect-[16/10] w-full overflow-hidden rounded-[16px]"
            style={{
              background: 'radial-gradient(ellipse at 50% 45%, #1a0f2e 0%, #0c0720 55%, #050210 100%)',
              boxShadow: [
                'inset 0 0 60px rgba(0,0,0,0.92)',
                'inset 0 0 120px rgba(124,58,237,0.14)',
                'inset 0 2px 3px rgba(255,255,255,0.07)',
              ].join(', '),
            }}>
            {/* Content layer — slight violet phosphor tint + subtle CRT curvature.
                textShadow prepends a soft red/cyan RGB-split for a VHS chroma-smear
                on all typed content; augmented only when motion is allowed. */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      // Rare 1px tape-tracking jitter — long flat hold then a quick step.
                      x: [0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0],
                      y: [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
                    }
              }
              className="absolute inset-0 flex items-stretch justify-stretch p-6 sm:p-10 md:p-14"
              style={{
                color: '#e9d7ff',
                textShadow: shouldReduceMotion
                  ? '0 0 6px rgba(167,139,250,0.55), 0 0 14px rgba(124,58,237,0.35)'
                  : '-0.5px 0 0 rgba(244,63,94,0.4), 0.5px 0 0 rgba(56,189,248,0.4), 0 0 6px rgba(167,139,250,0.55), 0 0 14px rgba(124,58,237,0.35)',
                transform: 'perspective(1600px) rotateX(0.3deg)',
                transformOrigin: 'center center',
                // Subtle corner mask — darkens the very edges to suggest tube curvature.
                WebkitMaskImage:
                  'radial-gradient(ellipse 105% 105% at 50% 50%, #000 72%, rgba(0,0,0,0.85) 90%, rgba(0,0,0,0.6) 100%)',
                maskImage:
                  'radial-gradient(ellipse 105% 105% at 50% 50%, #000 72%, rgba(0,0,0,0.85) 90%, rgba(0,0,0,0.6) 100%)',
              }}
              transition={
                shouldReduceMotion
                  ? undefined
                  : {
                      duration: 6,
                      times: [0, 0.35, 0.36, 0.5, 0.51, 0.52, 0.7, 0.71, 0.85, 0.86, 1],
                      repeat: Infinity,
                      ease: 'linear',
                    }
              }>
              {children}
            </motion.div>

            {/* Scanlines overlay — tuned for larger scale (2px/5px repeat) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(to bottom, rgba(0,0,0,0.28) 0px, rgba(0,0,0,0.28) 2px, transparent 2px, transparent 5px)',
                mixBlendMode: 'multiply',
                opacity: 0.55,
              }}
            />

            {/* Vertical phosphor mask — scaled up to 2px/3px */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(to right, rgba(124,58,237,0.05) 0px, rgba(124,58,237,0.05) 2px, transparent 2px, transparent 3px)',
                mixBlendMode: 'screen',
                opacity: 0.7,
              }}
            />

            {/* Radial vignette — darker corners */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 95%, rgba(0,0,0,0.75) 100%)',
              }}
            />

            {/* Phosphor bloom — soft violet wash behind the content */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 50%, rgba(167,139,250,0.18) 0%, rgba(124,58,237,0.08) 40%, transparent 70%)',
                mixBlendMode: 'screen',
              }}
            />

            {/* VHS grain — animated fractal noise layered as overlay. Subtle
                shimmer from stepped background-position moves; low opacity so it
                reads as tape texture, not dead-channel static. */}
            {!shouldReduceMotion && (
              <motion.div
                animate={{
                  backgroundPositionX: ['0%', '37%', '14%', '88%', '0%'],
                  backgroundPositionY: ['0%', '15%', '62%', '23%', '0%'],
                }}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.85'/></svg>\")",
                  backgroundSize: '180px 180px',
                  backgroundRepeat: 'repeat',
                  mixBlendMode: 'soft-light',
                  opacity: 0.12,
                }}
                transition={{duration: 0.6, repeat: Infinity, ease: 'linear'}}
              />
            )}

            {/* Flicker layer — very low amplitude opacity oscillation */}
            {!shouldReduceMotion && (
              <motion.div
                animate={{opacity: [0, 0.05, 0, 0.03, 0]}}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-white"
                style={{mixBlendMode: 'overlay'}}
                transition={{duration: 6, repeat: Infinity, ease: 'easeInOut'}}
              />
            )}

            {/* Horizontal retrace sweep — thinner bar at large scale */}
            {!shouldReduceMotion && (
              <motion.div
                animate={{y: ['-10%', '110%']}}
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 h-[5%]"
                style={{
                  background:
                    'linear-gradient(to bottom, transparent 0%, rgba(167,139,250,0.12) 50%, transparent 100%)',
                  mixBlendMode: 'screen',
                }}
                transition={{duration: 11, repeat: Infinity, ease: 'linear'}}
              />
            )}

            {/* Top glass reflection highlight */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-1/3 rounded-t-[16px]"
              style={{
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.06) 0%, transparent 100%)',
                mixBlendMode: 'screen',
              }}
            />
          </div>
        </div>

        {/* Corner screws — top-left, top-right, bottom-left, bottom-right */}
        <Screw className="left-3 top-3" />
        <Screw className="right-3 top-3" />
        <Screw className="left-3 bottom-3" />
        <Screw className="right-3 bottom-3" />

        {/* Power LED — lower-right of bezel */}
        <div
          aria-hidden="true"
          className="absolute bottom-3 right-10 h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2"
          style={{
            background: '#a78bfa',
            boxShadow: '0 0 8px rgba(167,139,250,0.95), 0 0 16px rgba(124,58,237,0.65)',
          }}
        />

        {/* Sticker slot — stuck on top of the bezel/screen edge, high z-index.
            Rotation is the sticker's responsibility (single source of truth). */}
        {sticker && (
          <div
            className="pointer-events-none absolute z-20"
            style={{
              top: '-12px',
              right: '24px',
              transformOrigin: 'top right',
            }}>
            {sticker}
          </div>
        )}
      </div>
    </div>
  );
};

CrtTv.displayName = 'CrtTv';

const Screw: FC<{className?: string}> = ({className}) => (
  <div
    aria-hidden="true"
    className={['absolute h-4 w-4 rounded-full', className].filter(Boolean).join(' ')}
    style={{
      background: 'radial-gradient(circle at 35% 30%, #4a4a4f 0%, #2a2a2d 45%, #141416 80%, #000 100%)',
      boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.14), inset 0 -1px 1px rgba(0,0,0,0.85), 0 2px 2px rgba(0,0,0,0.7)',
    }}>
    {/* Cross-slot */}
    <div
      className="absolute left-1/2 top-1/2 h-[1px] w-2.5 -translate-x-1/2 -translate-y-1/2"
      style={{background: 'rgba(0,0,0,0.75)', boxShadow: '0 1px 0 rgba(255,255,255,0.1)'}}
    />
    <div
      className="absolute left-1/2 top-1/2 h-2.5 w-[1px] -translate-x-1/2 -translate-y-1/2"
      style={{background: 'rgba(0,0,0,0.75)', boxShadow: '1px 0 0 rgba(255,255,255,0.1)'}}
    />
  </div>
);

export default CrtTv;
