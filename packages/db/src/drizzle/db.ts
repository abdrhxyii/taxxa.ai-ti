import 'dotenv/config';

import { drizzle } from 'drizzle-orm/neon-serverless';

import * as schema from './index';

// console.log(process.env.DATABASE_URL, "process.env.DATABASE_URL")

const db = drizzle({
  connection: "postgresql://neondb_owner:npg_7m4MLIckwyzU@ep-floral-surf-adwyxrzy-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  schema: schema,
  logger: true
});

export { db };
