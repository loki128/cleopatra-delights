# Dashboard Setup

After cloning and installing dependencies:

1. **Copy env:** `cp .env.example .env.local` and fill in values.
2. **Database:** Create a Supabase project, add `DATABASE_URL` to `.env.local` (Connection string from Project Settings → Database). If you use the **pooled** URL (port **6543** or host `*.pooler.supabase.co`), you **must** add `?pgbouncer=true` to the end of the URL (e.g. `...postgres?pgbouncer=true`), or Prisma will fail with "prepared statement already exists". The app auto-adds it at runtime; for CLI commands (`db push`, `migrate`) add it in `.env.local` yourself.
3. **Create tables:** Run **`npx prisma db push`** (fast, no migration history) or **`npx prisma migrate dev --name init`** (creates migration history). Requires `DATABASE_URL` in `.env.local`; Prisma loads `.env` and `.env.local`.
4. **Google OAuth:** Create OAuth 2.0 credentials in Google Cloud Console, set redirect URI to `http://localhost:3000/api/auth/callback/google` (and your production URL). Set `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET`.
5. **Admin whitelist:** Set `ADMIN_EMAILS` to a comma-separated list of Google emails that can sign in (e.g. your email).
6. **Run:** `npm run dev`, open `/dashboard/login`, sign in with Google.

Public order form at `/order` continues to work; new orders are saved to the database and optionally emailed via Resend.

**If you see "Unable to load dashboard":** Ensure `DATABASE_URL` is in `.env.local`, then run `npx prisma db push` from the project root and restart the dev server. In development the dashboard page shows the actual error message to help debug.
