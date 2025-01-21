CREATE TABLE "files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"path" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "files" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "project_overview" (
	"project_id" uuid PRIMARY KEY NOT NULL,
	"user_id" text DEFAULT requesting_user_id() NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "project_overview" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "files" ADD CONSTRAINT "files_project_id_project_overview_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project_overview"("project_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE POLICY "select_policy" ON "files" AS PERMISSIVE FOR SELECT TO "authenticated" USING (
        EXISTS (
          SELECT 1
          FROM project_overview
          WHERE project_overview.project_id = files.project_id
            AND project_overview.user_id = requesting_user_id()
        )
      );--> statement-breakpoint
CREATE POLICY "insert_policy" ON "files" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (
        EXISTS (
          SELECT 1
          FROM project_overview
          WHERE project_overview.project_id = files.project_id
            AND project_overview.user_id = requesting_user_id()
        )
      );--> statement-breakpoint
CREATE POLICY "policy_select" ON "project_overview" AS PERMISSIVE FOR SELECT TO "authenticated" USING (requesting_user_id() = user_id);--> statement-breakpoint
CREATE POLICY "policy_insert" ON "project_overview" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (requesting_user_id() = user_id);