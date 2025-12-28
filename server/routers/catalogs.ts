import { router, publicProcedure } from '../_core/trpc';
import { componentLibrary } from '../../client/src/constants/componentLibrary';
import { materials } from '../../client/src/constants/materials';
import { vehicles } from '../../client/src/constants/vehicles';
import { z } from 'zod';

export const catalogsRouter = router({
  // Listar biblioteca de componentes
  listComponents: publicProcedure
    .input(
      z
        .object({
          category: z
            .enum(['sleeping', 'kitchen', 'storage', 'electrical', 'plumbing', 'furniture'])
            .optional(),
        })
        .optional()
    )
    .query(({ input }) => {
      if (input?.category) {
        return componentLibrary.filter((c) => c.category === input.category);
      }
      return componentLibrary;
    }),

  // Obter componente específico
  getComponent: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return componentLibrary.find((c) => c.id === input.id) || null;
    }),

  // Listar materiais
  listMaterials: publicProcedure
    .input(
      z
        .object({
          category: z
            .enum(['estrutura', 'revestimento-externo', 'isolamento', 'revestimento-interno'])
            .optional(),
        })
        .optional()
    )
    .query(({ input }) => {
      if (input?.category) {
        return materials.filter((m) => m.category === input.category);
      }
      return materials;
    }),

  // Obter material específico
  getMaterial: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return materials.find((m) => m.id === input.id) || null;
    }),

  // Listar veículos
  listVehicles: publicProcedure.query(() => {
    return vehicles;
  }),

  // Obter veículo específico
  getVehicle: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return vehicles.find((v) => v.id === input.id) || null;
    }),
});

