module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [],
  theme: {
    fontFamily: {
      'basic-sans': ['Basic Sans'],
      poppins: ['Poppins'],
    },
  },
  variants: {
    extend: {
      backgroundColor: [
        'responsive',
        'hover',
        'focus',
        'active',
        'odd',
        'even',
      ],
    },
  },
};
