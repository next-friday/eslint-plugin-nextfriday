import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest/presets/default-esm",
  extensionsToTreatAsEsm: [".ts"],
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/**/__tests__/**/*.test.ts"],
  collectCoverageFrom: ["src/**/*.ts", "!src/**/__tests__/**", "!src/**/*.d.ts"],
  coverageReporters: ["text", "lcov", "html"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "^eslint-plugin-sonarjs$": "<rootDir>/src/__mocks__/eslint-plugin-sonarjs.ts",
    "^eslint-plugin-unicorn$": "<rootDir>/src/__mocks__/eslint-plugin-unicorn.ts",
  },
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  transformIgnorePatterns: ["node_modules/(?!(emoji-regex)/)"],
};

export default config;
