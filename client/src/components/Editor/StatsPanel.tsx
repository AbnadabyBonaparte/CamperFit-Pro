import { useProjectStore } from '../../stores/projectStore';
import { getVehicleById, defaultVehicle } from '../../constants/vehicles';
import { trpc } from '../../lib/trpc';
import { materials } from '../../constants/materials';
import { Skeleton } from '../ui/Skeleton';
import { Alert } from '../ui/Alert';

export function StatsPanel() {
  const { currentProject, components } = useProjectStore();

  // Buscar cálculos do backend
  const { data: weightData, isLoading: weightLoading, error: weightError } = trpc.calculations.calculateWeight.useQuery(
    {
      projectId: currentProject?.id || '',
      shellParams: currentProject?.shellParams ? {
        floorLength: currentProject.shellParams.floorLength,
        outerWidth: currentProject.shellParams.outerWidth,
        interiorHeight: currentProject.shellParams.interiorHeight,
        alcoveDepth: currentProject.shellParams.alcoveDepth,
        alcoveHeight: currentProject.shellParams.alcoveHeight,
        externalMaterialId: currentProject.shellParams.externalMaterialId,
        internalMaterialId: currentProject.shellParams.internalMaterialId,
        insulationMaterialId: currentProject.shellParams.insulationMaterialId,
        showFrame: currentProject.shellParams.showFrame,
        frameSize: currentProject.shellParams.frameSize,
      } : null,
      materials: materials.map(m => ({
        id: m.id,
        density: m.density,
        thickness: m.thickness,
      })),
    },
    {
      enabled: !!currentProject?.id,
      refetchInterval: 5000, // Refetch a cada 5s quando componentes mudarem
    }
  );

  const { data: cgData, isLoading: cgLoading, error: cgError } = trpc.calculations.calculateCG.useQuery(
    {
      projectId: currentProject?.id || '',
    },
    {
      enabled: !!currentProject?.id,
      refetchInterval: 5000,
    }
  );

  if (!currentProject) return null;

  const vehicle = currentProject.vehicleId
    ? getVehicleById(currentProject.vehicleId)
    : defaultVehicle;

  const isLoading = weightLoading || cgLoading;
  const error = weightError || cgError;

  if (isLoading) {
    return (
      <div className="p-4 border-b" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--color-border)' }}>
        <Skeleton className="h-4 w-24 mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border-b" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--color-border)' }}>
        <Alert variant="error" className="text-xs">
          Erro ao calcular estatísticas. Tente novamente.
        </Alert>
      </div>
    );
  }

  const stats = weightData ? {
    ...weightData,
    cgX: cgData?.cgX || 0,
    cgY: cgData?.cgY || 0,
    cgZ: cgData?.cgZ || 0,
  } : null;

  if (!stats) return null;

  // Determine payload color based on percentage
  const getPayloadColor = () => {
    if (stats.payloadPercentage > 90) return 'var(--color-error)';
    if (stats.payloadPercentage > 75) return 'var(--color-warning)';
    return 'var(--color-success)';
  };

  return (
    <div className="p-4 border-b" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--color-border)' }}>
      <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
        Estatísticas
      </h3>
      
      <div className="space-y-3 text-sm">
        {/* Peso */}
        <div>
          <div className="flex justify-between mb-1">
            <span style={{ color: 'var(--text-secondary)' }}>Peso Total:</span>
            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
              {stats.totalWeight.toFixed(1)} kg
            </span>
          </div>
          <div className="flex justify-between text-xs" style={{ color: 'var(--text-secondary)' }}>
            <span>Componentes: {stats.componentsWeight.toFixed(1)} kg</span>
            <span>Shell: {stats.shellWeight.toFixed(1)} kg</span>
          </div>
        </div>

        {/* Payload */}
        <div>
          <div className="flex justify-between mb-1">
            <span style={{ color: 'var(--text-secondary)' }}>Payload:</span>
            <span className="font-medium" style={{ color: getPayloadColor() }}>
              {stats.payloadUsed.toFixed(1)} / {stats.payloadMax} kg
            </span>
          </div>
          <div className="w-full rounded-full h-2" style={{ backgroundColor: 'var(--color-border)' }}>
            <div
              className="h-2 rounded-full"
              style={{
                width: `${Math.min(stats.payloadPercentage, 100)}%`,
                backgroundColor: getPayloadColor(),
              }}
            />
          </div>
          <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            {stats.payloadPercentage.toFixed(1)}% usado | {stats.payloadAvailable.toFixed(1)} kg disponível
          </div>
        </div>

        {/* Centro de Gravidade */}
        <div className="pt-2" style={{ borderTop: `1px solid var(--color-border)` }}>
          <div className="mb-2" style={{ color: 'var(--text-secondary)' }}>
            Centro de Gravidade:
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span style={{ color: 'var(--text-secondary)' }}>X:</span>
              <span className="font-mono" style={{ color: 'var(--text-primary)' }}>
                {stats.cgX.toFixed(0)} mm
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: 'var(--text-secondary)' }}>Y:</span>
              <span className="font-mono" style={{ color: 'var(--text-primary)' }}>
                {stats.cgY.toFixed(0)} mm
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: 'var(--text-secondary)' }}>Z:</span>
              <span className="font-mono" style={{ color: 'var(--text-primary)' }}>
                {stats.cgZ.toFixed(0)} mm
              </span>
            </div>
          </div>
        </div>

        {/* Componentes */}
        <div className="pt-2" style={{ borderTop: `1px solid var(--color-border)` }}>
          <div className="flex justify-between">
            <span style={{ color: 'var(--text-secondary)' }}>Componentes:</span>
            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
              {components.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
