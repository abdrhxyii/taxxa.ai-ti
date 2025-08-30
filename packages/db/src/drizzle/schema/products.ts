import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const productsTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  price: varchar({ length: 255 }).notNull(),
});

export type Product = typeof productsTable.$inferSelect
export type ProductInsert = typeof productsTable.$inferInsert
