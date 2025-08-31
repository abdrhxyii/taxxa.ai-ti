import 'dotenv/config';

import { drizzle } from 'drizzle-orm/neon-serverless';

import * as schema from './index';

// console.log(process.env.DATABASE_URL, "process.env.DATABASE_URL")

const db = drizzle({
  connection: process.env.DATABASE_URL!,
  schema: schema,
  logger: true
});

export { db };
