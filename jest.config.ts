import { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest/presets/default-esm', // Use this preset for ESM support
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // Add this line to handle .js extensions in imports
  },
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
};
export default config;