/* eslint-disable @typescript-eslint/no-var-requires */
const tsconfig = require('./tsconfig.json');
const moduleNameMapper = require('tsconfig-paths-jest')(tsconfig);

module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  modulePathIgnorePatterns: [
    'dist',
    '<rootDir>/src/database',
    '.*\\.module\\.ts$',
    'main\\.ts',
    '.coverage',
    '.eslintrc.js',
    'jest.config.js',
    'app.catch.ts',
    '.*\\.e2e-spec\\.ts$',
  ],
  moduleNameMapper,
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './.coverage',
  testEnvironment: 'node',
};
