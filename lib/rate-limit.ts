/**
 * In-memory rate limiter for serverless.
 * Resets on cold start — good enough to stop rapid-fire bot spam.
 * For distributed rate limiting, swap with Upstash Redis.
 */

const requests = new Map<string, { count: number; resetAt: number }>()

// Clean stale entries every 5 minutes to prevent memory leak
let lastCleanup = Date.now()
function cleanup() {
  const now = Date.now()
  if (now - lastCleanup < 300_000) return
  lastCleanup = now
  for (const [key, val] of requests) {
    if (now > val.resetAt) requests.delete(key)
  }
}

export function rateLimit(
  ip: string,
  maxRequests = 5,
  windowMs = 3_600_000
): { allowed: boolean; remaining: number } {
  cleanup()
  const now = Date.now()
  const record = requests.get(ip)

  if (!record || now > record.resetAt) {
    requests.set(ip, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: maxRequests - 1 }
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0 }
  }

  record.count++
  return { allowed: true, remaining: maxRequests - record.count }
}
