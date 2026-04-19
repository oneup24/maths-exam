import * as Sentry from '@sentry/react';

export function initSentry() {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  if (!dsn) return;
  Sentry.init({
    dsn,
    environment: import.meta.env.MODE,
    tracesSampleRate: 0.1,
    beforeSend(event) {
      // strip PII — remove email from user context
      if (event.user) delete event.user.email;
      return event;
    },
  });
}

export function setSentryUser(userId) {
  Sentry.setUser(userId ? { id: userId } : null);
}

export function setSentryContext(grade, authStatus) {
  Sentry.setContext('app', { grade, authStatus });
}

export const SentryErrorBoundary = Sentry.ErrorBoundary;
