/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        echoDark: "#0e0e12",
        echoPanel: "rgba(255,255,255,0.08)",
        echoAccent: "#00baff",
      },
      boxShadow: {
        glow: "0 0 20px rgba(0,186,255,0.5)",
      },
    },
  },
  plugins: [],
}
