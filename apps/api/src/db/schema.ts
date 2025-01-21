import { sql } from 'drizzle-orm';
import { pgPolicy, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { authenticatedRole } from 'drizzle-orm/supabase';

export const projectOverview = pgTable(
  'project_overview',
  {
    projectId: uuid('project_id').primaryKey(),
    userId: text('user_id').notNull().default(sql`requesting_user_id()`),
    name: text('name').notNull(),
    description: text('description').notNull(),
  },
  (t) => [
    pgPolicy('policy', {
      as: 'permissive',
      to: authenticatedRole,
      for: 'select',
      using: sql`requesting_user_id () = user_id`,
      withCheck: sql``,
    }),
    pgPolicy('policy', {
      as: 'permissive',
      to: authenticatedRole,
      for: 'insert',
      using: sql``,
      withCheck: sql`requesting_user_id () = user_id`,
    }),
  ],
);

export const Files = pgTable('files', {
  projectId: uuid('project_id').references(() => projectOverview.projectId, {
    onDelete: 'cascade',
  }),
  path: text('path').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export type InsertFiles = typeof Files.$inferInsert;
export type SelectFiles = typeof Files.$inferSelect;
