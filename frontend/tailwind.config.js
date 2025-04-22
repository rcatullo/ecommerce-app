/** @type {import('tailwindcss').Config} */
export const content = [
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
  "./app/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    colors: {
      brand: {
        light: "#3fbaeb",
        DEFAULT: "#0fa9e6",
        dark: "#0c87b8",
      },
    },
  },
};
export const plugins = [];