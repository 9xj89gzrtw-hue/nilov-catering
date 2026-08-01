import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // framer-motion анимации легитимно используют setState в effect
      // (reduced-motion fallback, parallax, count-up). Правило слишком строгое
      // для проектов с интенсивной анимацией — отключаем, чтобы не ловить
      // false-positive на устоявшихся паттернах.
      "react-hooks/set-state-in-effect": "off",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "skills/**",
    "v950-bot-fresh/**",
    "scripts/**",
    "download/**",
    "nilov-catering-repo/**",
    "nilov-catering/**",
    "tool-results/**",
  ]),
]);

export default eslintConfig;