module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>src/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  preset: '@shelf/jest-mongodb',
  roots: ['<rootDir>/src'],
  testEnvironment: 'jest-environment-node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
};
