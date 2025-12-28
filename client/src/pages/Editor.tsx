import { Canvas2D } from '../components/Canvas/Canvas2D';
import { Canvas3D } from '../components/Canvas/Canvas3D';
import { PropertyPanel } from '../components/PropertyPanel/PropertyPanel';
import { CanvasControls } from '../components/Canvas/Controls';
import { VehicleSelector } from '../components/Editor/VehicleSelector';
import { MaterialSelector } from '../components/Editor/MaterialSelector';
import { ComponentLibraryPanel } from '../components/Editor/ComponentLibraryPanel';
import { StatsPanel } from '../components/Editor/StatsPanel';
import { ThemeSelector } from '../components/Theme/ThemeSelector';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { useUIStore } from '../stores/uiStore';
import { CANVAS_DEFAULT_WIDTH, CANVAS_DEFAULT_HEIGHT } from '../../../shared/const';

export function Editor() {
  const { propertyPanelOpen, canvasMode, componentLibraryOpen } = useUIStore();
  
  // Keyboard shortcuts (Undo/Redo)
  useKeyboardShortcuts();

  return (
    <div className="flex h-screen" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Sidebar Left - Vehicle & Materials */}
      <div
        className="w-64 border-r flex flex-col"
        style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--color-border)' }}
      >
        <ThemeSelector />
        <VehicleSelector />
        <StatsPanel />
        <div className="flex-1 overflow-y-auto">
          <MaterialSelector />
        </div>
      </div>

      {/* Component Library Sidebar */}
      {componentLibraryOpen && <ComponentLibraryPanel />}

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <CanvasControls />

        {/* Canvas */}
        <div className="flex-1 p-4 overflow-hidden">
          {canvasMode === '2d' ? (
            <div className="w-full h-full overflow-auto">
              <Canvas2D width={CANVAS_DEFAULT_WIDTH} height={CANVAS_DEFAULT_HEIGHT} />
            </div>
          ) : (
            <div className="w-full h-full">
              <Canvas3D width={CANVAS_DEFAULT_WIDTH} height={CANVAS_DEFAULT_HEIGHT} />
            </div>
          )}
        </div>
      </div>

      {/* Property Panel */}
      {propertyPanelOpen && <PropertyPanel />}
    </div>
  );
}
