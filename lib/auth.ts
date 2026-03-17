import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

function getAdminEmails(): string[] {
  const list = process.env.ADMIN_EMAILS;
  if (list) {
    return list.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
  }
  const single = process.env.NEXTAUTH_ADMIN_EMAIL;
  if (single) return [single.trim().toLowerCase()];
  return [];
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
      if (!email) return false;
      const allowed = getAdminEmails();
      if (allowed.length === 0) {
        if (process.env.NODE_ENV === "production") {
          console.error("SECURITY: No ADMIN_EMAILS set in production. Blocking all sign-ins.");
          return false;
        }
        console.warn("No ADMIN_EMAILS or NEXTAUTH_ADMIN_EMAIL set; allowing any email (dev only).");
        return true;
      }
      return allowed.includes(email);
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
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  trustHost: true,
});
