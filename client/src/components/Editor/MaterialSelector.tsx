import { useState } from 'react';
import { useProjectStore } from '../../stores/projectStore';
import { materials, getMaterialsByCategory, MaterialCategory } from '../../constants/materials';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';

const categories: MaterialCategory[] = ['estrutura', 'revestimento-externo', 'isolamento', 'revestimento-interno'];

const categoryLabels: Record<MaterialCategory, string> = {
  'estrutura': 'Estrutura',
  'revestimento-externo': 'Revestimento Externo',
  'isolamento': 'Isolamento',
  'revestimento-interno': 'Revestimento Interno',
};

export function MaterialSelector() {
  const { currentProject, setCurrentProject } = useProjectStore();
  const [activeTab, setActiveTab] = useState<MaterialCategory>('estrutura');

  const categoryMaterials = getMaterialsByCategory(activeTab);
  
  const getSelectedMaterialId = (category: MaterialCategory): string | undefined => {
    if (!currentProject?.shellParams) return undefined;
    
    const keyMap: Record<MaterialCategory, keyof typeof currentProject.shellParams> = {
      'estrutura': 'structureMaterialId',
      'revestimento-externo': 'externalMaterialId',
      'isolamento': 'insulationMaterialId',
      'revestimento-interno': 'internalMaterialId',
    };

    return currentProject.shellParams[keyMap[category]] as string | undefined;
  };

  const handleMaterialChange = (category: MaterialCategory, materialId: string) => {
    if (!currentProject) return;
    
    const keyMap: Record<MaterialCategory, keyof typeof currentProject.shellParams> = {
      'estrutura': 'structureMaterialId',
      'revestimento-externo': 'externalMaterialId',
      'isolamento': 'insulationMaterialId',
      'revestimento-interno': 'internalMaterialId',
    };

    const shellParams = currentProject.shellParams || {
      outerWidth: currentProject.width || 1500,
      floorLength: currentProject.length || 2000,
      interiorHeight: currentProject.height || 1800,
      alcoveDepth: 400,
      alcoveAngle: 30,
      alcoveHeight: 600,
      bojoOffset: 200,
      bojoRadius: 300,
      roofPackage: 0,
      showFrame: false,
      frameSize: '50x50',
    };

    setCurrentProject({
      ...currentProject,
      shellParams: {
        ...shellParams,
        [keyMap[category]]: materialId,
      },
    });
  };

  return (
    <div className="p-4" style={{ backgroundColor: 'var(--surface)' }}>
      <h3 className="text-sm font-medium mb-4" style={{ color: 'var(--text-primary)' }}>
        Materiais
      </h3>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`px-3 py-2 text-xs font-medium transition-colors ${
              activeTab === category
                ? 'border-b-2'
                : 'opacity-60 hover:opacity-100'
            }`}
            style={{
              color: activeTab === category ? 'var(--accent-1)' : 'var(--text-secondary)',
              borderBottomColor: activeTab === category ? 'var(--accent-1)' : 'transparent',
            }}
          >
            {categoryLabels[category]}
          </button>
        ))}
      </div>

      {/* Material List */}
      <div className="space-y-2">
        {categoryMaterials.map((material) => {
          const selectedMaterialId = getSelectedMaterialId(activeTab);
          return (
            <Card
              key={material.id}
              className={`cursor-pointer transition-all ${
                selectedMaterialId === material.id ? 'ring-2' : ''
              }`}
              style={{
                ringColor: selectedMaterialId === material.id ? 'var(--accent-1)' : 'transparent',
              } as React.CSSProperties}
              onClick={() => handleMaterialChange(activeTab, material.id)}
            >
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
                    {material.name}
                  </label>
                  {selectedMaterialId === material.id && (
                    <Badge variant="default">Selecionado</Badge>
                  )}
                </div>
                <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {material.density} kg/m²
                  {material.costPerM2 && ` • R$ ${material.costPerM2.toFixed(2)}/m²`}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
