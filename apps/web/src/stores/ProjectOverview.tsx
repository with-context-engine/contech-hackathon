import { create } from 'zustand';

interface ProjectOverview {
  projectId: string;
  userId: string;
  name: string;
  imageUrl: string;
  description: string;
}

interface ProjectOverviewState {
  projects: ProjectOverview[];

  // Loading State
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;

  // Error State
  error: string | null;
  setError: (error: string | null) => void;

  // CRUD Operations
  createProject: (project?: Partial<ProjectOverview>) => void;
  // updateProject: (projectId: string, updates: Partial<Omit<ProjectOverview, 'projectId' | 'userId'>>) => Promise<void>;
}

export const useProjectOverviewStore = create<ProjectOverviewState>()(
  (set, get) => ({
    projects: [],
    isLoading: false,
    error: null,

    setIsLoading: (isLoading: boolean) => {
      set({ isLoading });
    },
    setError: (error: string | null) => {
      set({ error });
    },
    createProject: (project?: Partial<ProjectOverview>) => {
      const newProject: ProjectOverview = {
        projectId: crypto.randomUUID(),
        userId: project?.userId || '',
        name:
          project?.name || `New TakeOff Project ${get().projects.length + 1}`,
        imageUrl:
          project?.imageUrl ||
          '/api/placeholder?width=300&height=200&dark=true',
        description:
          project?.description ||
          'Double-click to open. Click to edit description.',
      };
      console.log(newProject);
      set((state) => ({
        projects: [...state.projects, newProject],
      }));
    },
  }),
);
