import { sql } from 'drizzle-orm';
import { pgPolicy, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { authenticatedRole } from 'drizzle-orm/supabase';

export const projectOverview = pgTable('project_overview', {
  projectId: uuid('project_id').primaryKey(),
  userId: text('user_id').notNull().default(sql`requesting_user_id()`),
  name: text('name').notNull(),
  image_url: text('image_url').notNull(),
  description: text('description').notNull(),
});

export const files = pgTable('files', {
  id: uuid('id').default(sql`gen_random_uuid()`).primaryKey(),
  projectId: uuid('project_id')
    .references(() => projectOverview.projectId, {
      onDelete: 'cascade',
    })
    .notNull(),
  path: text('path').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export type InsertFiles = typeof files.$inferInsert;
export type SelectFiles = typeof files.$inferSelect;
