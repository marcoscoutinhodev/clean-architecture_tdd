module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>src/**/*.ts',
    '!<rootDir>src/main/**',
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  preset: '@shelf/jest-mongodb',
  roots: ['<rootDir>/src'],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  watchPathIgnorePatterns: ['globalConfig'],
};
