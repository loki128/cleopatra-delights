import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { securityLog } from "@/lib/security-log";

function getAdminEmails(): string[] {
  const list = process.env.ADMIN_EMAILS;
  if (list) {
    return list.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
  }
  const single = process.env.NEXTAUTH_ADMIN_EMAIL;
  if (single) return [single.trim().toLowerCase()];
  return [];
}

/**
 * Checks whether a given email is in the ADMIN_EMAILS allowlist.
 * Exported so server actions can perform admin role verification
 * independently of NextAuth session checks.
 */
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const allowed = getAdminEmails();
  // SECURITY: fail-closed -- if no admin emails configured, deny all access
  if (allowed.length === 0) return false;
  return allowed.includes(email.toLowerCase());
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID ?? process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/dashboard/login",
  },
  callbacks: {
    signIn({ user }) {
      const email = user?.email?.toLowerCase();
      if (!email) {
        securityLog("AUTH_SIGN_IN_DENIED", { reason: "no_email" });
        return false;
      }
      const allowed = getAdminEmails();

      // SECURITY: fail-closed -- when no admin emails are configured, deny
      // all sign-ins rather than allowing anyone in.
      if (allowed.length === 0) {
        console.error(
          "[SECURITY] ADMIN_EMAILS is not configured. All sign-ins are DENIED. " +
          "Set ADMIN_EMAILS in .env.local to allow dashboard access."
        );
        securityLog("AUTH_SIGN_IN_DENIED", { email, reason: "no_admin_emails_configured" });
        return false;
      }

      if (!allowed.includes(email)) {
        securityLog("AUTH_SIGN_IN_DENIED", { email, reason: "not_in_allowlist" });
        return false;
      }

      securityLog("AUTH_SIGN_IN_SUCCESS", { email });
      return true;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
      }
      return session;
    },
    jwt({ token, user }) {
      if (user) token.sub = user.id;
      return token;
    },
  },
  // SECURITY: 8-hour session max age (was 30 days) -- limits exposure window
  // if a session token is compromised.
  session: { strategy: "jwt", maxAge: 8 * 60 * 60 },
  trustHost: true,
});
