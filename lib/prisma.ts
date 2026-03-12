import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

function addPgBouncerParam(url: string): string {
  // Supabase pooler (port 6543) requires pgbouncer=true so Prisma doesn't use prepared statements
  if (
    (url.includes("supabase") && url.includes("6543")) ||
    url.includes("pooler.supabase")
  ) {
    if (!url.includes("pgbouncer=true")) {
      return url.includes("?") ? `${url}&pgbouncer=true` : `${url}?pgbouncer=true`;
    }
  }
  return url;
}

function createPrismaClient(): PrismaClient {
  const raw = process.env.DATABASE_URL;
  if (!raw) {
    throw new Error("DATABASE_URL is not set. Set it in .env or .env.local to use the dashboard.");
  }
  const url = addPgBouncerParam(raw);
  const adapter = new PrismaPg({ connectionString: url });
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

function getPrisma(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;
  globalForPrisma.prisma = createPrismaClient();
  return globalForPrisma.prisma;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_, prop) {
    return (getPrisma() as unknown as Record<string | symbol, unknown>)[prop];
  },
});
