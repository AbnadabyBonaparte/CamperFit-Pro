import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config({ path: './server/.env' });

export default {
  schema: './drizzle/schema.ts',
  out: './drizzle/migrations',
  driver: 'mysql2',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || 'mysql://user:password@localhost:3306/camperfit',
  },
} satisfies Config;

