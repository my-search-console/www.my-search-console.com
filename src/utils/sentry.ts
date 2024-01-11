import * as Sentry from "@sentry/react"

export const startSentry = () => {
  const dsn = process.env.SENTRY_DSN

  if (process.env.NODE_ENV === "production") {
    Sentry.init({
      dsn,
    })
  }
}
