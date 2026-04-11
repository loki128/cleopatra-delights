/**
 * Content-based spam detection.
 * Returns a reason string if spam is detected, or null if clean.
 */

const URL_REGEX = /https?:\/\/[^\s]+/gi
const SPAM_PHRASES = [
  'buy now', 'click here', 'free money', 'casino', 'viagra',
  'crypto', 'bitcoin', 'investment opportunity', 'make money fast',
  'congratulations you', 'dear friend', 'nigerian prince',
  'wire transfer', 'western union', 'lottery', 'pills online',
  'seo services', 'web traffic', 'backlinks', 'rank your site',
]

export function detectSpam(fields: {
  name: string
  email: string
  notes: string
  phone?: string
}): string | null {
  const { name, email, notes, phone } = fields

  // Too many URLs in notes (real customers don't paste 3+ links)
  const urlCount = (notes.match(URL_REGEX) || []).length
  if (urlCount > 2) return 'Too many links in message'

  // Name contains URL
  if (URL_REGEX.test(name)) return 'Invalid name'

  // Known spam phrases in notes
  const lower = notes.toLowerCase()
  for (const phrase of SPAM_PHRASES) {
    if (lower.includes(phrase)) return 'Message flagged as spam'
  }

  // Email domain check — block known disposable email services
  const domain = email.split('@')[1]?.toLowerCase()
  const disposable = [
    'mailinator.com', 'guerrillamail.com', 'tempmail.com', 'throwaway.email',
    'yopmail.com', 'sharklasers.com', 'guerrillamailblock.com', 'grr.la',
    'dispostable.com', 'trashmail.com', 'maildrop.cc', 'temp-mail.org',
  ]
  if (domain && disposable.includes(domain)) return 'Disposable email not accepted'

  // Suspiciously long name (bots sometimes paste garbage)
  if (name.length > 100) return 'Name too long'

  // Phone with non-phone characters (bots stuff URLs/text in phone fields)
  if (phone && /[a-zA-Z]{3,}/.test(phone)) return 'Invalid phone number'

  return null
}
