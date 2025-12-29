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
import { useProjectStore } from '../stores/projectStore';
import { CANVAS_DEFAULT_WIDTH, CANVAS_DEFAULT_HEIGHT } from '@/shared/const';
import { Skeleton } from '../components/ui/Skeleton';
import { Alert } from '../components/ui/Alert';
import { Card, CardContent } from '../components/ui/Card';

export function Editor() {
  const { propertyPanelOpen, canvasMode, componentLibraryOpen } = useUIStore();
  const { currentProject, components, isLoading, error } = useProjectStore();
  
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
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="flex flex-col gap-4 items-center">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-64 w-full max-w-md" />
              </div>
            </div>
          ) : error ? (
            <div className="w-full h-full flex items-center justify-center">
              <Card>
                <CardContent className="p-6">
                  <Alert variant="error" className="mb-4">
                    {error}
                  </Alert>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Erro ao carregar projeto. Tente recarregar a página.
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : !currentProject ? (
            <div className="w-full h-full flex items-center justify-center">
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                    Nenhum projeto selecionado.
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Selecione um projeto do dashboard para começar a editar.
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : components.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center">
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                    Nenhum componente adicionado ainda.
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Use a biblioteca de componentes para adicionar itens ao seu projeto.
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : canvasMode === '2d' ? (
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
