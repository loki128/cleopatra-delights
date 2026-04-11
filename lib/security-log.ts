/**
 * Security event logging utility.
 *
 * Emits structured JSON to stdout so log aggregators (Vercel, Datadog, etc.)
 * can parse and alert on security-relevant events.
 *
 * Events logged:
 *  - AUTH_SIGN_IN_SUCCESS / AUTH_SIGN_IN_DENIED
 *  - RATE_LIMIT_HIT
 *  - ADMIN_ACTION (mutations via server actions)
 *  - TURNSTILE_MISSING_PRODUCTION
 */
export function securityLog(event: string, details: Record<string, unknown> = {}) {
  const entry = {
    timestamp: new Date().toISOString(),
    event,
    ...details,
  };
  console.log(`[SECURITY] ${JSON.stringify(entry)}`);
}
