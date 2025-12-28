import { create } from 'zustand';
import { historyStore, HistoryAction } from './historyStore';

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
  setProject: (project: Project | null) => void;
  setCurrentProject: (project: Project | null) => void;
  setComponents: (components: Component[]) => void;
  addComponent: (component: Component) => void;
  updateComponent: (id: string, updates: Partial<Component>) => void;
  removeComponent: (id: string) => void;
  selectComponent: (id: string | null) => void;
  setVehicleId: (vehicleId: string) => void;
  setShellMaterial: (materialId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Undo/Redo
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
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
    set((state) => {
      const newComponents = [...state.components, component];
      historyStore.push(
        { type: 'add_component', componentId: component.id, component },
        { components: newComponents }
      );
      return { components: newComponents };
    }),
  
  updateComponent: (id, updates) =>
    set((state) => {
      const oldComponent = state.components.find((c) => c.id === id);
      if (!oldComponent) return state;
      
      const newComponents = state.components.map((comp) =>
        comp.id === id ? { ...comp, ...updates } : comp
      );
      
      historyStore.push(
        { type: 'update_component', componentId: id, oldValue: oldComponent, newValue: { ...oldComponent, ...updates } },
        { components: newComponents }
      );
      
      return { components: newComponents };
    }),
  
  removeComponent: (id) =>
    set((state) => {
      const component = state.components.find((c) => c.id === id);
      if (!component) return state;
      
      const newComponents = state.components.filter((comp) => comp.id !== id);
      historyStore.push(
        { type: 'remove_component', componentId: id, component },
        { components: newComponents }
      );
      
      return {
        components: newComponents,
        selectedComponentId: state.selectedComponentId === id ? null : state.selectedComponentId,
      };
    }),
  
  selectComponent: (id) =>
    set((state) => ({
      selectedComponentId: id,
      components: state.components.map((comp) => ({
        ...comp,
        selected: comp.id === id,
      })),
    })),
  
  setVehicleId: (vehicleId) => set((state) => {
    if (!state.currentProject) return state;
    return {
      currentProject: {
        ...state.currentProject,
        vehicleId,
      },
    };
  }),
  
  setShellMaterial: (materialId) => set((state) => {
    if (!state.currentProject) return state;
    return {
      currentProject: {
        ...state.currentProject,
        shellParams: {
          ...(state.currentProject.shellParams || {}),
          materialId,
        },
      },
    };
  }),
  
  setProject: (project) => set({ currentProject: project }),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),
  
  // Undo/Redo
  undo: () => {
    const action = historyStore.undo();
    if (!action) return;
    
    set((state) => {
      // Aplicar undo baseado no tipo de ação
      switch (action.type) {
        case 'add_component':
          return {
            components: state.components.filter((c) => c.id !== action.componentId),
          };
        case 'remove_component':
          return {
            components: [...state.components, action.component],
          };
        case 'update_component':
          return {
            components: state.components.map((c) =>
              c.id === action.componentId ? action.oldValue : c
            ),
          };
        default:
          return state;
      }
    });
  },
  
  redo: () => {
    const action = historyStore.redo();
    if (!action) return;
    
    set((state) => {
      switch (action.type) {
        case 'add_component':
          return {
            components: [...state.components, action.component],
          };
        case 'remove_component':
          return {
            components: state.components.filter((c) => c.id !== action.componentId),
          };
        case 'update_component':
          return {
            components: state.components.map((c) =>
              c.id === action.componentId ? action.newValue : c
            ),
          };
        default:
          return state;
      }
    });
  },
  
  canUndo: () => historyStore.canUndo(),
  canRedo: () => historyStore.canRedo(),
}));

