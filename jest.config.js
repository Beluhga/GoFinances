module.exports = {
    preset: "jest-expo",
    testPathIgnorePatterns: [
      "/node_modules",
      "/android",
      "/ios"
    ],
    setupFilesAfterEnv: [
      "@testing-library/jest-native/extend-expect",
      "jest-styled-components",
     
    ],
    setupFiles: [
      "./jestSetupFile.js"
    ],

    collectCoverage: true,
    collectCoverageFrom: [
      "src/**/*.tsx",
      "!src/**/*.spec.tsx"
    ],
    coverageReporters:[
      "lcov"
    ]
  }




  /*
  ------------------------------------------------------
      // todas as pastas dentro dele seram ignorados
      testPathIgnorePatterns: [
      "/node_modules",
      "/android",
      "/ios"
    ],

    "!src//*.spec.tsx" = para ignora os testes 

  */