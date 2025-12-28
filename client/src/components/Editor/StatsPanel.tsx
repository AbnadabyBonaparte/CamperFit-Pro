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

  return (
    <div className="p-4 bg-white border-b border-gray-200">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Estatísticas</h3>
      
      <div className="space-y-3 text-sm">
        {/* Peso */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-gray-600">Peso Total:</span>
            <span className="font-medium">{stats.totalWeight.toFixed(1)} kg</span>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Componentes: {stats.componentsWeight.toFixed(1)} kg</span>
            <span>Shell: {stats.shellWeight.toFixed(1)} kg</span>
          </div>
        </div>

        {/* Payload */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-gray-600">Payload:</span>
            <span className={`font-medium ${
              stats.payloadPercentage > 90 ? 'text-red-600' :
              stats.payloadPercentage > 75 ? 'text-yellow-600' :
              'text-green-600'
            }`}>
              {stats.payloadUsed.toFixed(1)} / {stats.payloadMax} kg
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                stats.payloadPercentage > 90 ? 'bg-red-600' :
                stats.payloadPercentage > 75 ? 'bg-yellow-600' :
                'bg-green-600'
              }`}
              style={{ width: `${Math.min(stats.payloadPercentage, 100)}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {stats.payloadPercentage.toFixed(1)}% usado | {stats.payloadAvailable.toFixed(1)} kg disponível
          </div>
        </div>

        {/* Centro de Gravidade */}
        <div className="pt-2 border-t border-gray-200">
          <div className="text-gray-600 mb-2">Centro de Gravidade:</div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">X:</span>
              <span className="font-mono">{stats.cgX.toFixed(0)} mm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Y:</span>
              <span className="font-mono">{stats.cgY.toFixed(0)} mm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Z:</span>
              <span className="font-mono">{stats.cgZ.toFixed(0)} mm</span>
            </div>
          </div>
        </div>

        {/* Componentes */}
        <div className="pt-2 border-t border-gray-200">
          <div className="flex justify-between">
            <span className="text-gray-600">Componentes:</span>
            <span className="font-medium">{components.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

