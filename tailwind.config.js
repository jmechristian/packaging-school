/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './features/**/*.{js,ts,jsx,tsx}',
    './helpers/**/*.{js,ts,jsx,tsx}',
    './slices/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: 'Inter',
    },
    extend: {
      animation: {
        flip: 'flip 6s infinite steps(2, end)',
        rotate: 'rotate 3s linear infinite both',
      },
      keyframes: {
        flip: {
          to: {
            transform: 'rotate(360deg)',
          },
        },
        rotate: {
          to: {
            transform: 'rotate(90deg)',
          },
        },
      },
      fontFamily: {
        roboto: 'Inter, sans-serif',
        greycliff: 'Inter, sans-serif',
        nickel: 'nickel-gothic-variable, sans-serif',
        etna: 'etna, sans-serif',
        trans: 'transducer, sans-serif',
        transLong: '"transducer-extended", sans-serif',
        bit: 'bitcount-mono-single-square, sans-serif',
        oswald: 'oswald, sans-serif',
      },
      colors: {
        'base-brand': '#1f97bf',
        'base-dark': '#04607e',
        'base-dark-highlight': '#0a2b35',
        'base-light': '#bee1ec',
        'base-mid': '#0585b0',
        'brand-green': '#1bd159',
        'brand-indigo': '#304bc9',
        'brand-indigo-light': '#7789df',
        'brand-red': '#ff4421',
        'brand-yellow': '#ffbe21',
        'brand-yellow-light': '#ffca4b',
        clemson: '#ff9321',
        'clemson-dark': '#ca6800',
        dark: '#0e1424',
        'dark-mid': '#303437',
        'dark-dark': '#0d1118',
        'unilever-blue': '#1f36c7',
        'unilever-darkblue': '#001f82',
        'unilever-lightblue': '#005eff',
        'unilever-salmon': '#fea29a',
        'unilever-green': '#008651',
        'unilever-jade': '#00d7c4',
        'unilever-purple': '#7705bc',
        'unilever-lavendar': '#e2bee8',
        'gb-main': '#00bcdd',
        'gb-green': '#93c840',
        'gb-dark': '#051923',
        'gb-gray': '#636466',
        'gb-red': '#FB6107',
        'ap-yellow': '#E4A800',
        'ap-darkblue': '#005892',
        'ap-blue': '#0873B8',
        'ap-red': '#E43A00',
        'cummins-red': '#D02323',
      },
      backgroundImage: {
        'dark-mobile':
          "url('https://res.cloudinary.com/dno7xxmmy/image/upload/v1666493878/pschool/gradient-bg3_mobile_hd9t2i.png')",
        'dark-lg':
          "url('https://res.cloudinary.com/dno7xxmmy/image/upload/v1666045015/pschool/gradient-bg4_rrmnwf.webp')",
        'bootcamp-mobile':
          "url('https://res.cloudinary.com/dno7xxmmy/image/upload/v1666706513/pschool/bootcamp_bg_im0gtc.png')",
        'cmpm-cert':
          "url('https://res.cloudinary.com/dno7xxmmy/image/upload/v1667313142/pschool/cmpm_bg_mbncgs.png')",
        demo: "url('https://images.unsplash.com/photo-1678449463288-95465b27e73d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80')",
      },
    },
  },
  variants: {
    extends: {
      lineClamp: ['hover'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('autoprefixer'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
