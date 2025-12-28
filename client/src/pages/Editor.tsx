import { Canvas2D } from '../components/Canvas/Canvas2D';
import { Canvas3D } from '../components/Canvas/Canvas3D';
import { PropertyPanel } from '../components/PropertyPanel/PropertyPanel';
import { CanvasControls } from '../components/Canvas/Controls';
import { VehicleSelector } from '../components/Editor/VehicleSelector';
import { MaterialSelector } from '../components/Editor/MaterialSelector';
import { ComponentLibraryPanel } from '../components/Editor/ComponentLibraryPanel';
import { StatsPanel } from '../components/Editor/StatsPanel';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { useUIStore } from '../stores/uiStore';

export function Editor() {
  const { propertyPanelOpen, canvasMode, componentLibraryOpen } = useUIStore();
  
  // Keyboard shortcuts (Undo/Redo)
  useKeyboardShortcuts();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Left - Vehicle & Materials */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
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
              <Canvas2D width={1200} height={800} />
            </div>
          ) : (
            <div className="w-full h-full">
              <Canvas3D width={1200} height={800} />
            </div>
          )}
        </div>
      </div>

      {/* Property Panel */}
      {propertyPanelOpen && <PropertyPanel />}
    </div>
  );
}

