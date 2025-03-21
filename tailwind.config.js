/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        backgroundImage: {
          'button-primary-gradient': 'linear-gradient(to right, #9575cd, #ac93d8)',
          'button-danger-gradient': 'linear-gradient(to bottom, #EB5D68, #E63946)' // Primary-400 to Primary-500
        },
        colors: {
          // Light Mode Colors
          primary: {
            DEFAULT: "#9575CD",
            50: "#FDFCFE",
            100: "#F1EDF8",
            200: "#DACFEE",
            300: "#C3B1E3",
            400: "#AC93D8",
            500: "#9575CD",
            600: "#754CBE",
            700: "#5C389A",
            800: "#432971",
            900: "#2B1A48",
            950: "#1E1233",
          },
          text: "#352f36",
          background: "#FFFaf0",
          neutral: {
            DEFAULT: "#756877",
            50: "#948696",
            100: "#8A7C8D",
            200: '#756877',
            300: '#605562',
            400: '#4A424C',
          },
          accent: {
            DEFAULT: "#1B998B",
            50: "#83E9DE",
            100: "#71E6D9",
            200: "#4FE0D0",
            300: "#2CDAC6",
            400: "#21BCAB",
            500: "#1B998B",
            600: "#136960",
            700: "#0A3A34",
            800: "#020A09",
          },
  
          // Dark Mode Colors
          "dark-primary": {
            DEFAULT: "#5C389A",
            50: "#2B1A48",
            100: "#432971",
            200: "#5C389A",
            300: "#754CBE",
            400: "#9575CD",
            500: "#AC93D8",
            600: "#C3B1E3",
            700: "#DACFEE",
            800: "#F1EDF8",
            900: "#FDFCFE",
          },
          "dark-text": "#FFFFFF",
          "dark-background": "#352f36",
          "dark-neutral": {
            DEFAULT: "#8A7C8D",
            50: "#4A424C",
            100: "#605562",
            200: "#756877",
            300: "#8A7C8D",
            400: "#948696",
          },
          "dark-accent": {
            DEFAULT: "#0A3A34",
            50: "#020A09",
            100: "#0A3A34",
            200: "#136960",
            300: "#1B998B",
            400: "#21BCAB",
            500: "#2CDAC6",
            600: "#4FE0D0",
            700: "#71E6D9",
            800: "#83E9DE",
          },
        },
        animation: {
          "pulse-slow": "pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        },
        keyframes: {
          pulse: {
            "0%, 100%": { opacity: 0.6 },
            "50%": { opacity: 0.4 },
          },
        },
        utilities: {
          ".animation-delay-2000": {
            "animation-delay": "2000ms",
          },
        },
      },
    },
    plugins: [require("tailwindcss-animate")],
  };
  