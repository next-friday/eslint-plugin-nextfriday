import type { Config } from "jest";

const config: Config = {
  extensionsToTreatAsEsm: [".ts"],
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/**/__tests__/**/*.test.ts"],
  collectCoverageFrom: ["src/**/*.ts", "!src/**/__tests__/**", "!src/**/*.d.ts"],
  coverageReporters: ["text", "lcov", "html"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transform: {
    "^.+\\.ts$": [
      "@swc/jest",
      {
        jsc: {
          parser: {
            syntax: "typescript",
          },
        },
        module: {
          type: "es6",
        },
      },
    ],
  },
  transformIgnorePatterns: ["node_modules/(?!(emoji-regex)/)"],
};

export default config;
