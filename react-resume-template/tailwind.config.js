// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,css,scss}'],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: '#0A0A0A',
          DEFAULT: '#0A0A0A',
        },
        secondary: {
          bg: '#1A1A1A',
          DEFAULT: '#1A1A1A',
        },
        light: {
          bg: '#F5F5F5',
          DEFAULT: '#F5F5F5',
        },
        accent: {
          DEFAULT: '#2563EB',
          hover: '#3B82F6',
        },
        text: {
          primary: '#FFFFFF',
          'primary-on-light': '#111111',
          secondary: '#9CA3AF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      spacing: {
        'section-sm': '120px',
        'section': '140px',
        'section-lg': '160px',
      },
      maxWidth: {
        content: '1200px',
      },
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
        'fade-up': {
          '0%': {opacity: '0', transform: 'translateY(30px)'},
          '100%': {opacity: '1', transform: 'translateY(0)'},
        },
        'fade-in': {
          '0%': {opacity: '0'},
          '100%': {opacity: '1'},
        },
        'slide-down': {
          '0%': {opacity: '0', transform: 'translateY(-100%)'},
          '100%': {opacity: '1', transform: 'translateY(0)'},
        },
        'gradient-x': {
          '0%, 100%': {backgroundPosition: '0% 50%'},
          '50%': {backgroundPosition: '100% 50%'},
        },
        'line-expand': {
          '0%': {width: '0%'},
          '100%': {width: '100%'},
        },
        'fog-drift-1': {
          '0%': {transform: 'translateX(-10%) scaleX(1)', opacity: '0.4'},
          '50%': {transform: 'translateX(5%) scaleX(1.1)', opacity: '0.2'},
          '100%': {transform: 'translateX(-10%) scaleX(1)', opacity: '0.4'},
        },
        'fog-drift-2': {
          '0%': {transform: 'translateX(10%) scaleX(1.1)', opacity: '0.3'},
          '50%': {transform: 'translateX(-5%) scaleX(1)', opacity: '0.15'},
          '100%': {transform: 'translateX(10%) scaleX(1.1)', opacity: '0.3'},
        },
        'fog-drift-3': {
          '0%': {transform: 'translateX(0%) scaleX(1)', opacity: '0.25'},
          '50%': {transform: 'translateX(8%) scaleX(1.15)', opacity: '0.35'},
          '100%': {transform: 'translateX(0%) scaleX(1)', opacity: '0.25'},
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s ease-out forwards',
        'fade-up-delay-1': 'fade-up 0.8s ease-out 0.2s forwards',
        'fade-up-delay-2': 'fade-up 0.8s ease-out 0.4s forwards',
        'fade-up-delay-3': 'fade-up 0.8s ease-out 0.6s forwards',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'slide-down': 'slide-down 0.5s ease-out forwards',
        'gradient-x': 'gradient-x 3s ease infinite',
        'line-expand': 'line-expand 1s ease-out 0.8s forwards',
        'fog-1': 'fog-drift-1 12s ease-in-out infinite',
        'fog-2': 'fog-drift-2 16s ease-in-out infinite',
        'fog-3': 'fog-drift-3 20s ease-in-out infinite',
      },
      screens: {
        touch: {raw: 'only screen and (pointer: coarse)'},
      },
    },
  },
};
