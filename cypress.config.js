/* eslint-disable no-undef */
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    env: {
      USERNAME: process.env.USERNAME,
      PASSWORD: process.env.PASSWORD,
    },
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    pageLoadTimeout: 60000,
  },
  setupNodeEvents(on, config) {
    return config;
  },
});
