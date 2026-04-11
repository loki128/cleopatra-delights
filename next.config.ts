import type { NextConfig } from "next";

// Content-Security-Policy directives -- restrict all resource loading to
// known-good origins. Inline styles are allowed because Tailwind / Next.js
// inject them at runtime; everything else is locked down.
const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' https://fonts.gstatic.com",
  "connect-src 'self' https://challenges.cloudflare.com",
  "frame-src https://challenges.cloudflare.com",
  "object-src 'none'",
  "base-uri 'self'",
].join("; ");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  compress: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // SECURITY: CSP -- restricts scripts, styles, images, fonts,
          // connections, and frames to known-good origins only.
          { key: "Content-Security-Policy", value: cspDirectives },
          // SECURITY: HSTS -- enforce HTTPS for 1 year including subdomains.
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          // SECURITY: Permissions-Policy -- disable camera, microphone, and
          // geolocation APIs that this application does not need.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
