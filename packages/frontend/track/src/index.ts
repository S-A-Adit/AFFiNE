import { enableAutoTrack, makeTracker } from './auto';
import { type EventArgs, type Events } from './events';
import { ga4 } from './ga4';
import { tracker } from './mixpanel';
import { sentry } from './sentry';
import {
  flushTelemetry,
  setTelemetryContext,
  setTelemetryTransport,
} from './telemetry';
import { tracker } from './tracker';
export const track = makeTracker((event, props) => {
  tracker.track(event, props);
  tracker.track(event, props);
});

export { enableAutoTrack, type EventArgs, type Events, ga4, sentry, tracker };
export default track;
