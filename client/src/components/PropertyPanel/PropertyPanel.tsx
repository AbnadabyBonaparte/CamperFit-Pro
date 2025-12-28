import { useProjectStore } from '../../stores/projectStore';
import { ComponentForm } from './ComponentForm';

export function PropertyPanel() {
  const { components, selectedComponentId } = useProjectStore();

  const selectedComponent = components.find((comp) => comp.id === selectedComponentId);

  return (
    <div className="w-80 bg-white border-l border-gray-300 h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Propriedades</h2>
      </div>

      <div className="p-4">
        {selectedComponent ? (
          <ComponentForm component={selectedComponent} />
        ) : (
          <div className="text-gray-500 text-sm">
            Selecione um componente para editar suas propriedades
          </div>
        )}
      </div>
    </div>
  );
}

