import * as Sentry from "@sentry/gatsby"

Sentry.init({
  dsn: process.env.SENTRY_DSN,
})
