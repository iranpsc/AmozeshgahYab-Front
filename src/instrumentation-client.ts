// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://12660553f658bd7e308ce7a0f9977461@sentry.irpsc.com/23",

  integrations: [Sentry.replayIntegration()],

  tracesSampleRate: 1,

  replaysSessionSampleRate: 0.1,

  replaysOnErrorSampleRate: 1.0,
});

const client = Sentry.getClient();
const options = client?.getOptions();

console.log("========== SENTRY DEBUG ==========");
console.log("DSN:", options?.dsn);
console.log("Tunnel:", options?.tunnel);
console.log("Transport:", options?.transport);
console.log("Client:", client);
console.log("==================================");

export const onRouterTransitionStart =
  Sentry.captureRouterTransitionStart;


