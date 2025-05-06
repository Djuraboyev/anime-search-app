import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      colors: {
        brandBlue: '#1e1e4b',
      },
    },
  },
  content: ['./src/**/*.{js,ts,jsx,tsx}'], 
  plugins: [],
};

export default config;