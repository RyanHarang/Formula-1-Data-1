module.exports = {
    "jest": {
        "collectCoverage": true,
        "collectCoverageFrom": [
            "**/*.{js,jsx}",
            "!**/node_modules/**",
            "!**/vendor/**",
            "!**/jest.setup.js" // Exclude setup files if needed
        ],
        "coverageDirectory": "./coverage"
    }
};