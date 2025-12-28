import { Canvas2D } from '../components/Canvas/Canvas2D';
import { Canvas3D } from '../components/Canvas/Canvas3D';
import { PropertyPanel } from '../components/PropertyPanel/PropertyPanel';
import { CanvasControls } from '../components/Canvas/Controls';
import { useUIStore } from '../stores/uiStore';

export function Editor() {
  const { propertyPanelOpen, canvasMode } = useUIStore();

  return (
    <div className="flex h-screen bg-gray-100">
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

