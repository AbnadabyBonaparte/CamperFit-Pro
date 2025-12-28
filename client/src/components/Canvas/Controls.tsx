import { useUIStore } from '../../stores/uiStore';

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
  } = useUIStore();

  return (
    <div className="bg-white border-b border-gray-300 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Mode Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setCanvasMode('2d')}
            className={`px-3 py-1 rounded text-sm ${
              canvasMode === '2d'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            2D
          </button>
          <button
            onClick={() => setCanvasMode('3d')}
            className={`px-3 py-1 rounded text-sm ${
              canvasMode === '3d'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            3D
          </button>
        </div>

        {/* Grid Toggle */}
        <button
          onClick={toggleGrid}
          className={`px-3 py-1 rounded text-sm ${
            showGrid
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {showGrid ? 'Grid: ON' : 'Grid: OFF'}
        </button>

        {/* Zoom */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom(zoom * 0.9)}
            className="px-2 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300"
          >
            −
          </button>
          <span className="text-sm text-gray-700 w-16 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom(zoom * 1.1)}
            className="px-2 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300"
          >
            +
          </button>
        </div>
      </div>

      {/* Right Side Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleComponentLibrary}
          className={`px-3 py-1 rounded text-sm ${
            componentLibraryOpen
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Biblioteca
        </button>
        <button
          onClick={togglePropertyPanel}
          className={`px-3 py-1 rounded text-sm ${
            propertyPanelOpen
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Propriedades
        </button>
      </div>
    </div>
  );
}

