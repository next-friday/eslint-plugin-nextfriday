import rules from "./rules";

const plugin = { rules };

const baseRules = {
  "nextfriday/no-emoji": "warn",
  "nextfriday/file-kebab-case": "warn",
  "nextfriday/md-filename-case-restriction": "warn",
  "nextfriday/prefer-destructuring-params": "warn",
  "nextfriday/no-explicit-return-type": "warn",
  "nextfriday/prefer-import-type": "warn",
} as const;

const baseRecommendedRules = {
  "nextfriday/no-emoji": "error",
  "nextfriday/file-kebab-case": "error",
  "nextfriday/md-filename-case-restriction": "error",
  "nextfriday/prefer-destructuring-params": "error",
  "nextfriday/no-explicit-return-type": "error",
  "nextfriday/prefer-import-type": "error",
} as const;

const jsxRules = {
  "nextfriday/jsx-pascal-case": "warn",
} as const;

const jsxRecommendedRules = {
  "nextfriday/jsx-pascal-case": "error",
} as const;

const createConfig = (configRules: Record<string, string>) => ({
  plugins: {
    nextfriday: plugin,
  },
  rules: configRules,
});

const configs = {
  base: createConfig(baseRules),
  "base/recommended": createConfig(baseRecommendedRules),
  react: createConfig({
    ...baseRules,
    ...jsxRules,
  }),
  "react/recommended": createConfig({
    ...baseRecommendedRules,
    ...jsxRecommendedRules,
  }),
  nextjs: createConfig({
    ...baseRules,
    ...jsxRules,
  }),
  "nextjs/recommended": createConfig({
    ...baseRecommendedRules,
    ...jsxRecommendedRules,
  }),
};

export default configs;
