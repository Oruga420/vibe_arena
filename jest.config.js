/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.js'],
  transform: {
    '\\.js$': ['babel-jest', { presets: [['@babel/preset-env', { targets: { node: 'current' } }]] }],
  },
  collectCoverageFrom: [
    'lib/dropConfig.js',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

module.exports = config;
