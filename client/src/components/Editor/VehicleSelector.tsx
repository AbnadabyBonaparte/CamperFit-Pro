import { useProjectStore } from '../../stores/projectStore';
import { vehicles, getVehicleById } from '../../constants/vehicles';
import { Select } from '../ui/Select';
import { Card, CardContent } from '../ui/Card';

export function VehicleSelector() {
  const { currentProject, setVehicleId } = useProjectStore();

  const selectedVehicleId = currentProject?.vehicleId || vehicles[0].id;
  const selectedVehicle = getVehicleById(selectedVehicleId) || vehicles[0];

  const handleVehicleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newVehicleId = e.target.value;
    setVehicleId(newVehicleId);
  };

  return (
    <div className="p-4 border-b" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--color-border)' }}>
      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
        Veículo Base
      </label>
      <Select value={selectedVehicleId} onChange={handleVehicleChange}>
        {vehicles.map((vehicle) => (
          <option key={vehicle.id} value={vehicle.id}>
            {vehicle.name} ({vehicle.manufacturer} {vehicle.model})
          </option>
        ))}
      </Select>
      <div className="mt-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
        Payload: {selectedVehicle.payloadMax} kg | Caçamba: {selectedVehicle.bedLength} × {selectedVehicle.bedWidthInt} mm
      </div>
    </div>
  );
}
