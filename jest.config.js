module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    './src/**/*.ts',
    '!./src/main/**',
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/(.*)': '<rootDir>/src/$1',
  },
  preset: '@shelf/jest-mongodb',
  roots: ['<rootDir>/tests'],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  watchPathIgnorePatterns: ['globalConfig'],
};
