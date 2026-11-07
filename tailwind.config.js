
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                burgundy: "#8c1d27",
                dark: "#211e1d"
            }
        }
    },
    plugins: []
};
