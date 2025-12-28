import { create } from 'zustand';

// Temporary Project type (should match backend)
interface Project {
  id: string;
  name: string;
  description?: string;
  vehicleType?: string;
  vehicleId?: string; // ID do veículo selecionado
  length?: number;
  width?: number;
  height?: number;
  wheelbase?: number;
  maxGVWR?: number;
  
  // Shell parameters
  shellParams?: {
    outerWidth: number;
    floorLength: number;
    interiorHeight: number;
    alcoveDepth: number;
    alcoveAngle: number;
    alcoveHeight: number;
    bojoOffset: number;
    bojoRadius: number;
    roofPackage: number;
    showFrame: boolean;
    frameSize: '50x50' | '40x40' | '30x30';
    externalMaterialId?: string;
    structureMaterialId?: string;
    insulationMaterialId?: string;
    internalMaterialId?: string;
  };
}

interface Component {
  id: string;
  componentLibraryId?: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  dimensions: { length: number; width: number; height: number };
  weight?: number;
  material?: string;
  color?: string;
  selected?: boolean;
}

interface ProjectState {
  currentProject: Project | null;
  components: Component[];
  selectedComponentId: string | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setCurrentProject: (project: Project | null) => void;
  setComponents: (components: Component[]) => void;
  addComponent: (component: Component) => void;
  updateComponent: (id: string, updates: Partial<Component>) => void;
  removeComponent: (id: string) => void;
  selectComponent: (id: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  currentProject: null,
  components: [],
  selectedComponentId: null,
  isLoading: false,
  error: null,

  setCurrentProject: (project) => set({ currentProject: project }),
  
  setComponents: (components) => set({ components }),
  
  addComponent: (component) =>
    set((state) => ({
      components: [...state.components, component],
    })),
  
  updateComponent: (id, updates) =>
    set((state) => ({
      components: state.components.map((comp) =>
        comp.id === id ? { ...comp, ...updates } : comp
      ),
    })),
  
  removeComponent: (id) =>
    set((state) => ({
      components: state.components.filter((comp) => comp.id !== id),
      selectedComponentId: state.selectedComponentId === id ? null : state.selectedComponentId,
    })),
  
  selectComponent: (id) =>
    set((state) => ({
      selectedComponentId: id,
      components: state.components.map((comp) => ({
        ...comp,
        selected: comp.id === id,
      })),
    })),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),
}));

