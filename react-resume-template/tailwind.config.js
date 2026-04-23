// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,css,scss}'],
  theme: {
    extend: {
      keyframes: {
        typing: {
          '0%, 100%': {width: '0%'},
          '30%, 70%': {width: '100%'},
        },
        blink: {
          '0%': {
            opacity: 0,
          },
        },
        'rotate-loader': {
          '0%': {
            transform: 'rotate(0deg)',
            strokeDashoffset: '360%',
          },
          '100%': {
            transform: 'rotate(360deg)',
            strokeDashoffset: '-360%',
          },
        },
      },
      // NOTE: The previous `screens.touch: {raw: '...'}` entry was removed.
      // Tailwind v4 misinterprets legacy `raw` screens as breakpoint widths
      // (producing invalid `@media (width >= only screen ...)` output).
      // The `touch:` variant is now declared via `@custom-variant` in
      // `src/globals.css`, which is the v4-native way.
    },
  },
};
