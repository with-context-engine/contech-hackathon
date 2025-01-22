import type { ProjectOverview } from '@/types/ProjectOverview';
import { createClient } from '@repo/supabase/server';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const { projects } = await request.json();

  if (!projects) {
    return NextResponse.json(
      { error: 'No projects provided' },
      { status: 400 },
    );
  }

  const { data, error } = await supabase.from('project_overview').upsert(
    projects.map((project: ProjectOverview) => ({
      project_id: project.projectId,
      user_id: project.userId,
      image_url: project.imageUrl,
      name: project.name,
      description: project.description,
    })),
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
