import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/*.spec.(ts|tsx)'],
  passWithNoTests: false,
  collectCoverage: true,
  collectCoverageFrom: ['./src/**/*.(ts|tsx)'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/models/*',
    '<rootDir>/src/routes/*',
    '<rootDir>/src/middlewares/*',
  ],
  coverageThreshold: {
    global: {
      lines: 43,
    },
  },
}

export default config
