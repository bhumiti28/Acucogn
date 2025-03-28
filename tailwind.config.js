/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // add any other content paths you're using
  ],
  theme: {
    extend: {
      // Your existing theme extensions...
      
      // Add these new extensions for the flip card
      perspective: {
        '1000': '1000px',
      },
      rotate: {
        'y-180': 'rotateY(180deg)',
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      backfaceVisibility: {
        'hidden': 'hidden',
      },
      gradientColorStops: {
        // If you need custom gradient color stops
      },
      colors: {
        // Your custom colors, if any
        primary: {
          500: '#4F46E5', // Adjust to match your primary color
        },
        secondary: {
          500: '#9333EA', // Adjust to match your secondary color
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.transform-style-preserve-3d': {
          transformStyle: 'preserve-3d',
        },
        '.backface-hidden': {
          backfaceVisibility: 'hidden',
        },
        '.rotate-y-180': {
          transform: 'rotateY(180deg)',
        },
      };
      addUtilities(newUtilities);
    },
  ],
  // ... other Tailwind configuration options
};