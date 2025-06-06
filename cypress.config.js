const { defineConfig } = require("cypress");
require("dotenv").config();
module.exports = defineConfig({
  projectId: "iohc1g",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    user: process.env.USERTOKEN,
  },
});
