import { useProjectStore } from '../../stores/projectStore';
import { trpc } from '../../lib/trpc';
import { Select } from '../ui/Select';
import { Card, CardContent } from '../ui/Card';
import { Skeleton } from '../ui/Skeleton';
import { Alert } from '../ui/Alert';

export function VehicleSelector() {
  const { currentProject, setVehicleId } = useProjectStore();
  
  const { data: vehicles, isLoading, error } = trpc.catalogs.listVehicles.useQuery();
  
  const selectedVehicleId = currentProject?.vehicleId || vehicles?.[0]?.id;
  const { data: selectedVehicle } = trpc.catalogs.getVehicle.useQuery(
    { id: selectedVehicleId || '' },
    { enabled: !!selectedVehicleId }
  );

  const handleVehicleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newVehicleId = e.target.value;
    setVehicleId(newVehicleId);
  };

  if (isLoading) {
    return (
      <div className="p-4 border-b" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--color-border)' }}>
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border-b" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--color-border)' }}>
        <Alert variant="error" className="text-xs">
          Erro ao carregar veículos.
        </Alert>
      </div>
    );
  }

  if (!vehicles || vehicles.length === 0) {
    return (
      <div className="p-4 border-b" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--color-border)' }}>
        <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          Nenhum veículo disponível.
        </div>
      </div>
    );
  }

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
      {selectedVehicle && (
        <div className="mt-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
          Payload: {selectedVehicle.payloadMax} kg | Caçamba: {selectedVehicle.bedLength} × {selectedVehicle.bedWidthInt} mm
        </div>
      )}
    </div>
  );
}
