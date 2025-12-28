import { useUIStore } from '../../stores/uiStore';
import { Button } from '../ui/Button';

export function CanvasControls() {
  const {
    showGrid,
    toggleGrid,
    canvasMode,
    setCanvasMode,
    zoom,
    setZoom,
    propertyPanelOpen,
    togglePropertyPanel,
    componentLibraryOpen,
    toggleComponentLibrary,
  } = useUIStore();

  return (
    <div className="px-4 py-2 flex items-center justify-between border-b" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--color-border)' }}>
      <div className="flex items-center gap-4">
        {/* Mode Toggle */}
        <div className="flex gap-2">
          <Button
            variant={canvasMode === '2d' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setCanvasMode('2d')}
          >
            2D
          </Button>
          <Button
            variant={canvasMode === '3d' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setCanvasMode('3d')}
          >
            3D
          </Button>
        </div>

        {/* Grid Toggle */}
        <Button
          variant={showGrid ? 'primary' : 'ghost'}
          size="sm"
          onClick={toggleGrid}
        >
          {showGrid ? 'Grid: ON' : 'Grid: OFF'}
        </Button>

        {/* Zoom */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setZoom(zoom * 0.9)}
          >
            −
          </Button>
          <span className="text-sm w-16 text-center" style={{ color: 'var(--text-secondary)' }}>
            {Math.round(zoom * 100)}%
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setZoom(zoom * 1.1)}
          >
            +
          </Button>
        </div>
      </div>

      {/* Right Side Controls */}
      <div className="flex items-center gap-2">
        <Button
          variant={componentLibraryOpen ? 'primary' : 'ghost'}
          size="sm"
          onClick={toggleComponentLibrary}
        >
          Biblioteca
        </Button>
        <Button
          variant={propertyPanelOpen ? 'primary' : 'ghost'}
          size="sm"
          onClick={togglePropertyPanel}
        >
          Propriedades
        </Button>
      </div>
    </div>
  );
}

