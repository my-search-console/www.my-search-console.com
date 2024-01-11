import * as Sentry from "@sentry/gatsby"

Sentry.init({
  dsn: "https://f6d6eb4963584afc93e51f7d3136b07e@o1172147.ingest.sentry.io/6267024",
  integrations: [],
  //   integrations: [new Sentry.Replay()],

  //   // Set tracesSampleRate to 1.0 to capture 100%
  //   // of transactions for performance monitoring.
  //   // We recommend adjusting this value in production
  //   tracesSampleRate: 1.0,

  //   // Capture Replay for 10% of all sessions,
  //   // plus for 100% of sessions with an error
  //   replaysSessionSampleRate: 0.1,
  //   replaysOnErrorSampleRate: 1.0,
})
