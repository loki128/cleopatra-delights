# Dashboard Setup

After cloning and installing dependencies:

1. **Copy env:** `cp .env.example .env.local` and fill in values.
2. **Database:** Create a Supabase project, add `DATABASE_URL` to `.env.local`.
3. **Migrations:** Run `npx prisma migrate dev` to create tables (requires DATABASE_URL).
4. **Google OAuth:** Create OAuth 2.0 credentials in Google Cloud Console, set redirect URI to `http://localhost:3000/api/auth/callback/google` (and your production URL). Set `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET`.
5. **Admin whitelist:** Set `ADMIN_EMAILS` to a comma-separated list of Google emails that can sign in (e.g. your email).
6. **Run:** `npm run dev`, open `/dashboard/login`, sign in with Google.

Public order form at `/order` continues to work; new orders are saved to the database and optionally emailed via Resend.
