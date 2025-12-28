import { useQueryClient } from '@tanstack/react-query';
import { trpc } from '../lib/trpc';

export function useCalculateCG() {
  const queryClient = useQueryClient();
  return trpc.calculations.calculateCG.useMutation({
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [['project', variables.projectId]] });
    },
  });
}

export function useCalculateElectrical() {
  const queryClient = useQueryClient();
  return trpc.calculations.calculateElectrical.useMutation({
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [['project', variables.projectId]] });
    },
  });
}

export function useCalculateGas() {
  const queryClient = useQueryClient();
  return trpc.calculations.calculateGas.useMutation({
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [['project', variables.projectId]] });
    },
  });
}

export function useValidateCompliance() {
  const queryClient = useQueryClient();
  return trpc.calculations.validateCompliance.useMutation({
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [['project', variables.projectId]] });
    },
  });
}
