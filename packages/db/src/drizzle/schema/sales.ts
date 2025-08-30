import { integer, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";
import { productsTable } from "./products";
import { usersTable } from "./users";

export const salesTable = pgTable("sales", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer()
    .notNull()
    .references(() => usersTable.id),
  productId: integer()
    .notNull()
    .references(() => productsTable.id),
  quantity: varchar({ length: 255 }).notNull(),
});

export type Sale = typeof salesTable.$inferSelect;
export type SaleInsert = typeof salesTable.$inferInsert;