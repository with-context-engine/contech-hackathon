ALTER TABLE "project_overview" ADD COLUMN "image_url" text NOT NULL;--> statement-breakpoint
CREATE POLICY "policy_update" ON "project_overview" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (requesting_user_id() = user_id);--> statement-breakpoint
CREATE POLICY "policy_delete" ON "project_overview" AS PERMISSIVE FOR DELETE TO "authenticated" USING (requesting_user_id() = user_id);