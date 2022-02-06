module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    './src/**/*.ts',
    '!./src/main/**',
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  },
  preset: '@shelf/jest-mongodb',
  roots: ['<rootDir>/src'],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  watchPathIgnorePatterns: ['globalConfig'],
};
