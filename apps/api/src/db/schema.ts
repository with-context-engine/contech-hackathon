import { sql } from 'drizzle-orm';
import { pgPolicy, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { authenticatedRole } from 'drizzle-orm/supabase';

export const projectOverview = pgTable(
  'project_overview',
  {
    projectId: uuid('project_id').primaryKey(),
    userId: text('user_id').notNull().default(sql`requesting_user_id()`),
    name: text('name').notNull(),
    imageUrl: text('image_url').notNull(),
    description: text('description').notNull(),
  },
  (t) => [
    pgPolicy('policy_select', {
      as: 'permissive',
      to: authenticatedRole,
      for: 'select',
      using: sql`requesting_user_id() = user_id`,
    }),
    pgPolicy('policy_insert', {
      as: 'permissive',
      to: authenticatedRole,
      for: 'insert',
      using: sql``,
      withCheck: sql`requesting_user_id() = user_id`,
    }),
    pgPolicy('policy_update', {
      as: 'permissive',
      to: authenticatedRole,
      for: 'update',
      using: sql`requesting_user_id() = user_id`,
    }),
    pgPolicy('policy_delete', {
      as: 'permissive',
      to: authenticatedRole,
      for: 'delete',
      using: sql`requesting_user_id() = user_id`,
    }),
  ],
);

export const files = pgTable(
  'files',
  {
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
  },
  (t) => [
    pgPolicy('select_policy', {
      as: 'permissive',
      to: authenticatedRole,
      for: 'select',
      using: sql`
        EXISTS (
          SELECT 1
          FROM project_overview
          WHERE project_overview.project_id = files.project_id
            AND project_overview.user_id = requesting_user_id()
        )
      `,
    }),
    pgPolicy('insert_policy', {
      as: 'permissive',
      to: authenticatedRole,
      for: 'insert',
      using: sql``,
      withCheck: sql`
        EXISTS (
          SELECT 1
          FROM project_overview
          WHERE project_overview.project_id = files.project_id
            AND project_overview.user_id = requesting_user_id()
        )
      `,
    }),
  ],
);

export type InsertFiles = typeof files.$inferInsert;
export type SelectFiles = typeof files.$inferSelect;
