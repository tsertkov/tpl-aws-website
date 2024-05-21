import { defineConfig } from 'cypress'
import config from '../config.json' assert { type: 'json' }

const ENV = process.env.ENV
const DOMAIN = process.env.DOMAIN

if (!DOMAIN) {
  throw new Error('Missing DOMAIN environment variable')
}

export default defineConfig({
  e2e: {
    baseUrl: `https://${DOMAIN}`,
    env: {
      ENV,
      DOMAIN,
      GITHUB_REPO: config[ENV]?.githubRepo || config.default.githubRepo,
      BASIC_AUTH: config[ENV]?.basicAuth || config.default.basicAuth,
      BASIC_AUTH_USERNAME: config[ENV]?.basicAuthUsername || config.default.basicAuthUsername,
      BASIC_AUTH_PASSWORD: config[ENV]?.basicAuthPassword || config.default.basicAuthPassword,
    },
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
})
