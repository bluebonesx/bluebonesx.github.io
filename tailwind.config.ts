import themes from "daisyui/src/theming/themes";
import typography from "@tailwindcss/typography";
import daisyui from "daisyui";
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [typography, daisyui],
  daisyui: {
    themes: ["cupcake", "sunset"],
  },
} satisfies Config;
