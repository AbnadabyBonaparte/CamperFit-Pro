import { useQueryClient } from '@tanstack/react-query';
import { trpc } from '../lib/trpc';

export function useProjects() {
  return trpc.projects.list.useQuery({ skip: 0, take: 100 });
}

export function useProject(projectId: string | undefined) {
  return trpc.projects.get.useQuery(
    { id: projectId! },
    { enabled: !!projectId }
  );
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  return trpc.projects.create.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [['projects']] });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  return trpc.projects.update.useMutation({
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [['project', variables.id]] });
      queryClient.invalidateQueries({ queryKey: [['projects']] });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  return trpc.projects.delete.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [['projects']] });
    },
  });
}

export function useDuplicateProject() {
  const queryClient = useQueryClient();
  return trpc.projects.duplicate.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [['projects']] });
    },
  });
}

export function useProjectComponents(projectId: string | undefined) {
  return trpc.components.list.useQuery(
    { projectId: projectId! },
    { enabled: !!projectId }
  );
}
