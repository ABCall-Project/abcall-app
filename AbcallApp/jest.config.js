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
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
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
