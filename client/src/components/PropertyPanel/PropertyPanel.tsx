import { useProjectStore } from '../../stores/projectStore';
import { ComponentForm } from './ComponentForm';

export function PropertyPanel() {
  const { components, selectedComponentId } = useProjectStore();

  const selectedComponent = components.find((comp) => comp.id === selectedComponentId);

  return (
    <div className="w-80 h-full overflow-y-auto border-l" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--color-border)' }}>
      <div className="p-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Propriedades</h2>
      </div>

      <div className="p-4">
        {selectedComponent ? (
          <ComponentForm component={selectedComponent} />
        ) : (
          <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Selecione um componente para editar suas propriedades
          </div>
        )}
      </div>
    </div>
  );
}

