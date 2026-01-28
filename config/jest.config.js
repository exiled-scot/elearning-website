/**
 * Jest Configuration for eLearning Application
 *
 * This configuration extends the default react-scripts setup
 * with additional settings for comprehensive testing.
 */

module.exports = {
  // Use the default react-scripts test environment
  testEnvironment: 'jsdom',

  // Root directory for tests
  roots: ['<rootDir>/src'],

  // Test file patterns
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx}'
  ],

  // Files to ignore during testing
  testPathIgnorePatterns: [
    '/node_modules/',
    '/src/__tests__/e2e/',  // E2E tests are run separately with Playwright
    '/src/__tests__/__mocks__/'
  ],

  // Module name mappings for CSS and asset imports
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': 'identity-obj-proxy',
    // Handle image imports
    '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/__tests__/__mocks__/fileMock.js'
  },

  // Setup files to run before each test file
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTests.js'
  ],

  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
    '!src/reportWebVitals.js',
    '!src/**/__tests__/**',
    '!src/**/*.test.{js,jsx}',
    '!src/**/*.spec.{js,jsx}'
  ],

  // Coverage thresholds (can be adjusted as test coverage improves)
  coverageThreshold: {
    global: {
      branches: 30,
      functions: 30,
      lines: 30,
      statements: 30
    }
  },

  // Transform configuration
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  },

  // Module directories
  moduleDirectories: ['node_modules', 'src'],

  // Verbose output for CI
  verbose: true
};
