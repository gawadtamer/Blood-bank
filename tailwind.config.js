/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        crimson: {
          50: "#FDF2F3",
          100: "#FBE2E4",
          200: "#F4B9BF",
          300: "#E88A94",
          400: "#DA5865",
          500: "#C41E3A",
          600: "#A8172F",
          700: "#7A1220",
          800: "#5C0D18",
          900: "#3D0910"
        },
        ink: "#241618",
        cream: "#FDFBFA",
        stone: {
          50: "#F8F6F5",
          100: "#F4F1EF",
          200: "#E9E4E1",
          300: "#D8D0CC"
        }
      },
      fontFamily: {
        display: ["Almarai", "sans-serif"],
        body: ["Cairo", "sans-serif"]
      },
      boxShadow: {
        soft: "0 8px 30px -8px rgba(122, 18, 32, 0.15)",
        card: "0 4px 20px -4px rgba(36, 22, 24, 0.08)"
      },
      borderRadius: {
        xl2: "1.25rem"
      }
    }
  },
  plugins: []
}
