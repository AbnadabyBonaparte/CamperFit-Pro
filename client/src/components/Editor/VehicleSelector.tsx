import { vehicles, getVehicleById, Vehicle } from '../../constants/vehicles';
import { useProjectStore } from '../../stores/projectStore';

export function VehicleSelector() {
  const { currentProject, setCurrentProject } = useProjectStore();

  const handleVehicleChange = (vehicleId: string) => {
    const vehicle = getVehicleById(vehicleId);
    if (!vehicle || !currentProject) return;

    setCurrentProject({
      ...currentProject,
      vehicleId: vehicleId,
      vehicleType: 'custom', // Atualizar tipo se necessário
      length: vehicle.bedLength,
      width: vehicle.bedWidthInt,
      wheelbase: vehicle.wheelbase,
      maxGVWR: vehicle.payloadMax,
    });
  };

  return (
    <div className="p-4 bg-white border-b border-gray-200">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Veículo Base
      </label>
      <select
        value={currentProject?.vehicleId || vehicles[0].id}
        onChange={(e) => handleVehicleChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {vehicles.map((vehicle) => (
          <option key={vehicle.id} value={vehicle.id}>
            {vehicle.manufacturer} {vehicle.model} {vehicle.year || ''}
          </option>
        ))}
      </select>
      
      {currentProject?.vehicleId && (
        <div className="mt-2 text-xs text-gray-500">
          {(() => {
            const vehicle = getVehicleById(currentProject.vehicleId!);
            return vehicle ? (
              <>
                Caçamba: {vehicle.bedLength}mm × {vehicle.bedWidthInt}mm | 
                Payload: {vehicle.payloadMax}kg
              </>
            ) : null;
          })()}
        </div>
      )}
    </div>
  );
}

