/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest' // Transform JS/JSX files using Babel
  },
  transformIgnorePatterns: [
    '/node_modules/(?!quill)' // Allow Jest to transform `quill`
  ],
  moduleNameMapper: {
    '^.+\\.css$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^api/(.*)$': '<rootDir>/src/api/$1',
    '^context/(.*)$': '<rootDir>/src/context/$1',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^utils/(.*)$': '<rootDir>/src/utils/$1',
    '^pages/(.*)$': '<rootDir>/src/pages/$1',
    '^routes/(.*)$': '<rootDir>/src/routes/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
}

module.exports = config
