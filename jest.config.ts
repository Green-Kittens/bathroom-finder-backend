import { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  preset: "ts-jest/presets/default-esm", // Use this preset for ESM support
  transform: {
    "^.+\\.ts$": ["ts-jest", { useESM: true }],
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1", // Add this line to handle .js extensions in imports
  },
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  globalSetup: "./tests/setupMemoryDatabase.ts",
  globalTeardown: "./tests/teardownMemoryDatabase.ts",
  setupFilesAfterEnv: ["./tests/setupAfterEnv.ts"],
};
export default config;
