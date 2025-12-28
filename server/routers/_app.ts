import { router } from '../_core/trpc';
import { projectsRouter } from './projects';
import { componentsRouter } from './components';
import { calculationsRouter } from './calculations';
import { exportRouter } from './export';
import { marketplaceRouter } from './marketplace';

export const appRouter = router({
  projects: projectsRouter,
  components: componentsRouter,
  calculations: calculationsRouter,
  export: exportRouter,
  marketplace: marketplaceRouter,
});

export type AppRouter = typeof appRouter;

