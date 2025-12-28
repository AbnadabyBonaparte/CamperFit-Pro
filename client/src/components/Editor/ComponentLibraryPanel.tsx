import { componentLibrary, getComponentsByCategory, ComponentCategory, ComponentLibraryItem } from '../../constants/componentLibrary';
import { useProjectStore } from '../../stores/projectStore';
import { useState } from 'react';

const categoryLabels: Record<ComponentCategory, string> = {
  'sleeping': 'Dormitório',
  'kitchen': 'Cozinha',
  'storage': 'Armazenamento',
  'electrical': 'Elétrica',
  'plumbing': 'Hidráulica',
  'furniture': 'Mobiliário',
};

export function ComponentLibraryPanel() {
  const [selectedCategory, setSelectedCategory] = useState<ComponentCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { addComponent } = useProjectStore();

  const filteredComponents = selectedCategory === 'all'
    ? componentLibrary
    : getComponentsByCategory(selectedCategory);

  const displayComponents = searchQuery
    ? filteredComponents.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredComponents;

  const handleDragStart = (e: React.DragEvent, component: ComponentLibraryItem) => {
    e.dataTransfer.setData('component-library-id', component.id);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleAddComponent = (component: ComponentLibraryItem) => {
    const newComponent = {
      id: `comp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      componentLibraryId: component.id,
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      dimensions: component.dimensions,
      weight: component.weight,
      color: component.defaultColor,
      material: component.properties?.material,
    };

    addComponent(newComponent);
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Biblioteca de Componentes</h3>
        
        {/* Search */}
        <input
          type="text"
          placeholder="Buscar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Categories */}
      <div className="p-2 border-b border-gray-200 flex flex-wrap gap-1">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-2 py-1 text-xs rounded ${
            selectedCategory === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Todos
        </button>
        {(Object.keys(categoryLabels) as ComponentCategory[]).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-2 py-1 text-xs rounded ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {categoryLabels[category]}
          </button>
        ))}
      </div>

      {/* Component List */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-2">
          {displayComponents.map((component) => (
            <div
              key={component.id}
              draggable
              onDragStart={(e) => handleDragStart(e, component)}
              onClick={() => handleAddComponent(component)}
              className="p-2 border border-gray-300 rounded cursor-move hover:bg-gray-50 hover:border-blue-500 transition-colors"
            >
              <div className="text-sm font-medium text-gray-700">{component.name}</div>
              {component.description && (
                <div className="text-xs text-gray-500 mt-1">{component.description}</div>
              )}
              <div className="text-xs text-gray-400 mt-1">
                {component.dimensions.length}×{component.dimensions.width}×{component.dimensions.height}mm
                {' • '}
                {component.weight}kg
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

