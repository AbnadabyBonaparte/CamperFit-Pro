import { materials, getMaterialsByCategory, Material, MaterialCategory } from '../../constants/materials';
import { useProjectStore } from '../../stores/projectStore';

export function MaterialSelector() {
  const { currentProject, setCurrentProject } = useProjectStore();

  const categories: MaterialCategory[] = ['estrutura', 'revestimento-externo', 'isolamento', 'revestimento-interno'];
  const categoryLabels: Record<MaterialCategory, string> = {
    'estrutura': 'Estrutura',
    'revestimento-externo': 'Revestimento Externo',
    'isolamento': 'Isolamento',
    'revestimento-interno': 'Revestimento Interno',
  };

  const handleMaterialChange = (category: MaterialCategory, materialId: string) => {
    if (!currentProject) return;

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

    const keyMap: Record<MaterialCategory, keyof typeof shellParams> = {
      'estrutura': 'structureMaterialId',
      'revestimento-externo': 'externalMaterialId',
      'isolamento': 'insulationMaterialId',
      'revestimento-interno': 'internalMaterialId',
    };

    setCurrentProject({
      ...currentProject,
      shellParams: {
        ...shellParams,
        [keyMap[category]]: materialId,
      },
    });
  };

  const getSelectedMaterial = (category: MaterialCategory): string | undefined => {
    if (!currentProject?.shellParams) return undefined;
    
    const keyMap: Record<MaterialCategory, keyof typeof currentProject.shellParams> = {
      'estrutura': 'structureMaterialId',
      'revestimento-externo': 'externalMaterialId',
      'isolamento': 'insulationMaterialId',
      'revestimento-interno': 'internalMaterialId',
    };

    return currentProject.shellParams[keyMap[category]] as string | undefined;
  };

  return (
    <div className="p-4 bg-white">
      <h3 className="text-sm font-medium text-gray-700 mb-4">Materiais</h3>
      
      <div className="space-y-4">
        {categories.map((category) => {
          const categoryMaterials = getMaterialsByCategory(category);
          const selectedMaterialId = getSelectedMaterial(category);

          return (
            <div key={category}>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                {categoryLabels[category]}
              </label>
              <select
                value={selectedMaterialId || ''}
                onChange={(e) => handleMaterialChange(category, e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Selecione...</option>
                {categoryMaterials.map((material) => (
                  <option key={material.id} value={material.id}>
                    {material.name}
                  </option>
                ))}
              </select>
              
              {selectedMaterialId && (() => {
                const material = materials.find((m) => m.id === selectedMaterialId);
                return material ? (
                  <div className="mt-1 text-xs text-gray-500">
                    {material.costPerM2 ? `~R$ ${material.costPerM2}/m²` : ''}
                  </div>
                ) : null;
              })()}
            </div>
          );
        })}
      </div>
    </div>
  );
}

