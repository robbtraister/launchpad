export default {
  roots: ["<rootDir>/src"],
  collectCoverage: true,
  coveragePathIgnorePatterns: ["/node_modules/"],
  moduleFileExtensions: ["tsx", "ts", "jsx", "js", "json"],
  moduleNameMapper: {
    "\\.(scss)$": "identity-obj-proxy",
  },
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "\\.tsx?$": "ts-jest",
  },
};
