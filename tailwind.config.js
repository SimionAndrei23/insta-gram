module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    screens: {
      'sm':  {'min': '320px', 'max': '7px'},
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      transitionProperty: {
        'width': 'width'
    },
    },
  },
  variants: {
    extend: {
      keyframes: {
        animationUP: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      }
    },
    scrollSnapType: ['responsive']
  },
  plugins: [
    require('@tailwindcss/forms'), require('tailwind-scrollbar'),require('tailwind-scrollbar-hide'),
    require('tailwindcss-neumorphism'), require('tailwindcss-scroll-snap'),
  ],
}
