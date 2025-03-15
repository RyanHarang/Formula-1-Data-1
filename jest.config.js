module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Ensure setup file is loaded
  moduleFileExtensions: ['js', 'jsx', 'json'],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/file-mock.js",
    "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/file-mock.js",
  },
  projects: [
    "<rootDir>/packages/client", // Client workspace
    "<rootDir>/packages/server"  // Server workspace
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/jest.setup.js"
  ],
  coverageDirectory: "./coverage"
};