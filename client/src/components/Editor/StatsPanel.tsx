import { useProjectStore } from '../../stores/projectStore';
import { calculateShellWeight } from '../../utils/shellWeightCalculator';
import { getVehicleById, defaultVehicle } from '../../constants/vehicles';
import { useMemo } from 'react';

export function StatsPanel() {
  const { currentProject, components } = useProjectStore();

  const stats = useMemo(() => {
    if (!currentProject) return null;

    const vehicle = currentProject.vehicleId
      ? getVehicleById(currentProject.vehicleId)
      : defaultVehicle;

    // Peso dos componentes internos
    const componentsWeight = components.reduce((sum, comp) => sum + (comp.weight || 0), 0);

    // Peso da shell (se tiver params)
    let shellWeight = 0;
    if (currentProject.shellParams && vehicle) {
      shellWeight = calculateShellWeight(currentProject.shellParams, vehicle);
    }

    const totalWeight = componentsWeight + shellWeight;
    const payloadUsed = totalWeight;
    const payloadAvailable = vehicle ? vehicle.payloadMax - payloadUsed : 0;
    const payloadPercentage = vehicle ? (payloadUsed / vehicle.payloadMax) * 100 : 0;

    // CG aproximado (simplificado - usar calculadora real depois)
    const totalMomentX = components.reduce((sum, comp) => {
      return sum + (comp.weight || 0) * (comp.position.x || 0);
    }, 0);
    const totalMomentY = components.reduce((sum, comp) => {
      return sum + (comp.weight || 0) * (comp.position.y || 0);
    }, 0);
    const totalMomentZ = components.reduce((sum, comp) => {
      return sum + (comp.weight || 0) * (comp.position.z || 0);
    }, 0);

    const cgX = totalWeight > 0 ? totalMomentX / totalWeight : 0;
    const cgY = totalWeight > 0 ? totalMomentY / totalWeight : 0;
    const cgZ = totalWeight > 0 ? totalMomentZ / totalWeight : 0;

    return {
      componentsWeight,
      shellWeight,
      totalWeight,
      payloadUsed,
      payloadAvailable,
      payloadPercentage,
      payloadMax: vehicle?.payloadMax || 0,
      cgX,
      cgY,
      cgZ,
    };
  }, [currentProject, components]);

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
