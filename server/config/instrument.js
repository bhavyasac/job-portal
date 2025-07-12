// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"
import { nodeProfilingIntegration } from "@sentry/profiling-node"

Sentry.init({
  dsn: "https://f3d4aeb576b346060183750390460107@o4509524572962816.ingest.us.sentry.io/4509524574208000",
   integrations : [
    nodeProfilingIntegration(),
    Sentry.mongooseIntegration()
   ],
//    tracesSampleRate: 1.0 ,

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  // sendDefaultPii: true,
});

Sentry.profiler.startProfiler();