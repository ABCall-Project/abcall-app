module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(ts|tsx)?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 72,
      functions: 81,
      lines: 86,
      statements: 84,
    },
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/build/',
    '/out/',
    '<rootDir>/tests/setupTests.ts',
    '<rootDir>/tests/builders/',
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|react-native-safe-area-context)/)',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/build/',
    '/out/',
    '<rootDir>/tests/setupTests.ts',
    '<rootDir>/tests/builders/',
  ],
  testTimeout: 30000,
  moduleNameMapper: {
    '^react-native-config$': '<rootDir>/tests/__mocks__/react-native-config.js',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
  },
};
