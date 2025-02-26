import type { Config } from 'tailwindcss'

// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-var-requires
const { fontFamily } = require('tailwindcss/defaultTheme')

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        bg: '#daf5f0',
        main: '#c4a1ff',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        white: '#ffffff',
        black: '#000000',
        mongoose: {
          '50': '#f9f7f3',
          '100': '#f1ede3',
          '200': '#e2d9c6',
          '300': '#cfc0a2',
          '400': '#bca47f',
          '500': '#ac8c63',
          '600': '#9f7b57',
          '700': '#856449',
          '800': '#6c5240',
          '900': '#584436',
          '950': '#2f221b',
        },
        rose: {
          '50': '#faf6f6',
          '100': '#f5ebeb',
          '200': '#eedada',
          '300': '#e1c0c0',
          '400': '#ce9b9b',
          '500': '#bc7f7f',
          '600': '#a35f5f',
          '700': '#884d4d',
          '800': '#714343',
          '900': '#603c3c',
          '950': '#321d1d',
        },
        blue: {
          '50': '#f0fbfa',
          '100': '#d8f4f5',
          '200': '#b6e9eb',
          '300': '#83d7dd',
          '400': '#3bb3bd',
          '500': '#2ea1ac',
          '600': '#298391',
          '700': '#276a77',
          '800': '#285762',
          '900': '#254a54',
          '950': '#143038',
        },
        green: {
          '50': '#f1f8f2',
          '100': '#ddeede',
          '200': '#bcdec1',
          '300': '#7fbc8c',
          '400': '#61a672',
          '500': '#408955',
          '600': '#2e6d41',
          '700': '#255735',
          '800': '#1f462c',
          '900': '#1a3a25',
          '950': '#0e2015',
        },
        orange: {
          '50': '#fdf5ef',
          '100': '#fae8da',
          '200': '#f3ceb4',
          '300': '#ebae86',
          '400': '#e28355',
          '500': '#dc6333',
          '600': '#cd4d29',
          '700': '#aa3b24',
          '800': '#883124',
          '900': '#6e2a20',
          '950': '#3b130f',
        },
        vermillion: {
          '50': '#fff4ed',
          '100': '#ffe6d4',
          '200': '#ffc8a8',
          '300': '#ffa170',
          '400': '#ff6e37',
          '500': '#ff4911',
          '600': '#f02d06',
          '700': '#c71e07',
          '800': '#9e190e',
          '900': '#7f180f',
          '950': '#450805',
        },
        yellow: {
          '50': '#fffee7',
          '100': '#fffcc1',
          '200': '#fff686',
          '300': '#ffe941',
          '400': '#ffd70d',
          '500': '#ffc700',
          '600': '#d19100',
          '700': '#a66702',
          '800': '#89500a',
          '900': '#74410f',
          '950': '#442204',
        },
        purple: {
          '50': '#eff1fe',
          '100': '#e1e5fe',
          '200': '#c9cefc',
          '300': '#a9b0f8',
          '400': '#8686f3',
          '500': '#746beb',
          '600': '#624dde',
          '700': '#543ec4',
          '800': '#45359e',
          '900': '#3b327d',
          '950': '#241d49',
        },
        lavender: {
          '50': '#faf8fc',
          '100': '#f3f0f7',
          '200': '#ebe3f1',
          '300': '#dacce6',
          '400': '#c2abd5',
          '500': '#a17fbc',
          '600': '#936fae',
          '700': '#7d5a96',
          '800': '#694d7c',
          '900': '#563f64',
          '950': '#382645',
        },
        nepal: {
          '50': '#f4f9fa',
          '100': '#e6eff3',
          '200': '#d4e2e9',
          '300': '#b6d0da',
          '400': '#93b8c7',
          '500': '#7fa6bc',
          '600': '#668daa',
          '700': '#5a7c9b',
          '800': '#4e667f',
          '900': '#415567',
          '950': '#2b3540',
        },
        cerulean: {
          '50': '#edf8ff',
          '100': '#d8efff',
          '200': '#b9e3ff',
          '300': '#89d2ff',
          '400': '#51b8ff',
          '500': '#2998ff',
          '600': '#1179ff',
          '700': '#0b60ea',
          '800': '#104fc1',
          '900': '#134595',
          '950': '#112b5a',
        },
      },
      borderRadius: {
        base: '5px',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        Space_Grotesk: ['Space Grotesk', ...fontFamily.sans],
      },
      boxShadow: {
        base: '4px 4px 0px 0px rgba(0,0,0,1)',
        neoBrutalism: '4px 4px 0px 0px rgba(0,0,0,1)',
      },
      translate: {
        boxShadowX: '4px',
        boxShadowY: '4px',
      },
      fontWeight: {
        base: '500',
        heading: '700',
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
