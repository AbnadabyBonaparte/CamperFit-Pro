import { useState } from 'react';
import { useUIStore } from '../../stores/uiStore';
import { trpc } from '../../lib/trpc';
import { ComponentCategory } from '../../constants/componentLibrary';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Skeleton } from '../ui/Skeleton';
import { Alert } from '../ui/Alert';

const categories: ComponentCategory[] = ['sleeping', 'kitchen', 'storage', 'electrical', 'plumbing', 'furniture'];

export function ComponentLibraryPanel() {
  const { componentLibraryOpen, toggleComponentLibrary } = useUIStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ComponentCategory | 'all'>('all');

  const { data: components, isLoading, error } = trpc.catalogs.listComponents.useQuery({
    category: selectedCategory === 'all' ? undefined : selectedCategory,
  });

  if (!componentLibraryOpen) return null;

  const filteredComponents = (components || []).filter((component) => {
    const matchesSearch = component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleDragStart = (e: React.DragEvent, componentId: string) => {
    e.dataTransfer.setData('componentId', componentId);
  };

  return (
    <div
      className="w-64 border-r flex flex-col h-full"
      style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--color-border)' }}
    >
      <div className="p-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
            Biblioteca de Componentes
          </h3>
          <Button variant="ghost" size="sm" onClick={toggleComponentLibrary}>
            ✕
          </Button>
        </div>

        {/* Search */}
        <Input
          type="text"
          placeholder="Buscar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-2"
        />

        {/* Category Filter */}
        <div className="flex flex-wrap gap-1">
          <Button
            variant={selectedCategory === 'all' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setSelectedCategory('all')}
            className="text-xs"
          >
            Todos
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="text-xs"
            >
            {category === 'sleeping' && 'Dorm'}
            {category === 'kitchen' && 'Cozinha'}
            {category === 'storage' && 'Armazen.'}
            {category === 'electrical' && 'Elétrica'}
            {category === 'plumbing' && 'Hidráulica'}
            {category === 'furniture' && 'Mobília'}
            </Button>
          ))}
        </div>
      </div>

      {/* Component List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {isLoading && (
          <div className="space-y-2">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        )}

        {error && (
          <Alert variant="error" className="text-xs">
            Erro ao carregar componentes.
          </Alert>
        )}

        {!isLoading && !error && filteredComponents.length === 0 && (
          <div className="text-center py-8" style={{ color: 'var(--text-secondary)' }}>
            {searchQuery ? 'Nenhum componente encontrado' : 'Nenhum componente disponível'}
          </div>
        )}

        {!isLoading && !error && filteredComponents.length > 0 && (
          <>
            {filteredComponents.map((component) => (
            <Card
              key={component.id}
              draggable
              onDragStart={(e) => handleDragStart(e, component.id)}
              className="cursor-move hover:opacity-80 transition-opacity"
              style={{
                borderColor: 'var(--color-border)',
              }}
            >
              <CardContent className="p-3">
                <div className="flex items-start justify-between mb-1">
                  <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    {component.name}
                  </div>
                  <Badge variant="default" className="text-xs">
                    {component.category === 'sleeping' && 'Dorm'}
                    {component.category === 'kitchen' && 'Cozinha'}
                    {component.category === 'storage' && 'Armazen.'}
                    {component.category === 'electrical' && 'Elétrica'}
                    {component.category === 'plumbing' && 'Hidráulica'}
                    {component.category === 'furniture' && 'Mobília'}
                  </Badge>
                </div>
                {component.description && (
                  <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                    {component.description}
                  </div>
                )}
                <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                  {component.dimensions.length} × {component.dimensions.width} × {component.dimensions.height} mm
                  {' • '}
                  {component.weight} kg
                </div>
              </CardContent>
            </Card>
          ))}
          </>
        )}
      </div>
    </div>
  );
}
