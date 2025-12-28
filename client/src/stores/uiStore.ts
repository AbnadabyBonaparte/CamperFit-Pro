import { create } from 'zustand';

interface UIState {
  // Canvas state
  canvasMode: '2d' | '3d';
  showGrid: boolean;
  gridSize: number;
  zoom: number;
  pan: { x: number; y: number };

  // Panel state
  propertyPanelOpen: boolean;
  componentLibraryOpen: boolean;
  calculationsPanelOpen: boolean;

  // View settings
  theme: 'light' | 'dark';

  // Actions
  setCanvasMode: (mode: '2d' | '3d') => void;
  toggleGrid: () => void;
  setGridSize: (size: number) => void;
  setZoom: (zoom: number) => void;
  setPan: (pan: { x: number; y: number }) => void;
  togglePropertyPanel: () => void;
  toggleComponentLibrary: () => void;
  toggleCalculationsPanel: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useUIStore = create<UIState>((set) => ({
  // Canvas
  canvasMode: '2d',
  showGrid: true,
  gridSize: 50, // mm
  zoom: 1,
  pan: { x: 0, y: 0 },

  // Panels
  propertyPanelOpen: true,
  componentLibraryOpen: false,
  calculationsPanelOpen: false,

  // Theme
  theme: 'light',

  // Actions
  setCanvasMode: (mode) => set({ canvasMode: mode }),
  toggleGrid: () => set((state) => ({ showGrid: !state.showGrid })),
  setGridSize: (size) => set({ gridSize: size }),
  setZoom: (zoom) => set({ zoom }),
  setPan: (pan) => set({ pan }),
  togglePropertyPanel: () => set((state) => ({ propertyPanelOpen: !state.propertyPanelOpen })),
  toggleComponentLibrary: () => set((state) => ({ componentLibraryOpen: !state.componentLibraryOpen })),
  toggleCalculationsPanel: () => set((state) => ({ calculationsPanelOpen: !state.calculationsPanelOpen })),
  setTheme: (theme) => set({ theme }),
}));

