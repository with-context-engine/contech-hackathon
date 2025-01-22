ALTER TABLE "files" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "project_overview" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP POLICY "select_policy" ON "files" CASCADE;--> statement-breakpoint
DROP POLICY "insert_policy" ON "files" CASCADE;--> statement-breakpoint
DROP POLICY "policy_select" ON "project_overview" CASCADE;--> statement-breakpoint
DROP POLICY "policy_insert" ON "project_overview" CASCADE;--> statement-breakpoint
DROP POLICY "policy_update" ON "project_overview" CASCADE;--> statement-breakpoint
DROP POLICY "policy_delete" ON "project_overview" CASCADE;