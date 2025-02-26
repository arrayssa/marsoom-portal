/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./modules/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./assets/presets/**/*.{js,vue,ts}",
  ],
  theme: {

    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
      
    },
    fontSize: {
      xxs: '0.625rem',
      xs: '0.75rem',
      sm: '0.8rem',
      base: '0.875rem',
      xl: '1rem',
      '2xl': '1.125rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    fontWeight: {
      thin: '100',
      hairline: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      'extra-bold': '800',
      black: '900',
    },
    lineHeight: {
      
    },
    extend: {
      gridColumn : {
          'span-4' : "span 4 / span 4",
      },
      colors: {
        'primary': 'rgb(var(--primary-500))',
        'primary-50': 'rgb(var(--primary-50))',
        'primary-100': 'rgb(var(--primary-100))',
        'primary-200': 'rgb(var(--primary-200))',
        'primary-300': 'rgb(var(--primary-300))',
        'primary-400': 'rgb(var(--primary-400))',
        'primary-500': 'rgb(var(--primary-500))',
        'primary-600': 'rgb(var(--primary-600))',
        'primary-700': 'rgb(var(--primary-700))',
        'primary-800': 'rgb(var(--primary-800))',
        'primary-900': 'rgb(var(--primary-900))',
        'primary-950': 'rgb(var(--primary-950))',
        'surface-0': 'rgb(var(--surface-0))',
        'surface-50': 'rgb(var(--surface-50))',
        'surface-100': 'rgb(var(--surface-100))',
        'surface-200': 'rgb(var(--surface-200))',
        'surface-300': 'rgb(var(--surface-300))',
        'surface-400': 'rgb(var(--surface-400))',
        'surface-500': 'rgb(var(--surface-500))',
        'surface-600': 'rgb(var(--surface-600))',
        'surface-700': 'rgb(var(--surface-700))',
        'surface-800': 'rgb(var(--surface-800))',
        'surface-900': 'rgb(var(--surface-900))',
        'surface-950': 'rgb(var(--surface-950))',
        "blue1": "#eff0f2",
        "blue2": "#d9dadf", 
        "blue3": "#bbbcc6",
        "blue4": "#9b9dac",
        "blue5": "#7D8093",
        "blue6": "#60647b",
        "blue7": "#525569",
        "blue8": "#444757",
        "blue9": "#373946",
        "blue10": "#2b2d37",
        "table-head-text": "#023C50", 
        "thead-bg": "#EAF1F3",
        "table-border": "#fdfdfd",
        "lable": "#606370",
        "labelBG": "#F7F7F7",
        "bgcancel": "rgba(4, 60, 80, 0.12)",
        "grey3": "#949496",
        "activeborder": "rgba(21, 109, 137, 1)",
        "grey15": "#BBBFCD",
        "red1": "#FF4B55",
        "red10": "rgba(255, 75, 85, 0.08)",
        "green1": "#18A066",
        "green10": "rgba(24, 146, 102, 0.08)",
        "iconBorder": "#E0E3E9"
      },
      height: {
        '42': '2.625rem',
        '54': '3.375rem',
        '48': '3rem',
        '120': '7.5rem',
        '22px': '1.4rem',
      },
      width: {
        '22px': '1.4rem',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '18px': '1.125rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

    },
  },
  plugins: [ require('tailwindcss-rtl') ],
}