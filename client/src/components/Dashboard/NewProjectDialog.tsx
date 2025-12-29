import { useState } from 'react';
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter } from '../ui/Dialog';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { DEFAULT_VEHICLE_DIMENSIONS } from '@/shared/const';

interface NewProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: {
    name: string;
    description?: string;
    vehicleType?: string;
    length?: number;
    width?: number;
    height?: number;
    wheelbase?: number;
    maxGVWR?: number;
  }) => void;
}

export function NewProjectDialog({ isOpen, onClose, onCreate }: NewProjectDialogProps) {
  const defaultDims = DEFAULT_VEHICLE_DIMENSIONS.custom;
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    vehicleType: 'custom' as const,
    length: defaultDims.length,
    width: defaultDims.width,
    height: defaultDims.height,
    wheelbase: defaultDims.wheelbase,
    maxGVWR: defaultDims.maxGVWR,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    onCreate(formData);
    const resetDims = DEFAULT_VEHICLE_DIMENSIONS.custom;
    setFormData({
      name: '',
      description: '',
      vehicleType: 'custom' as const,
      length: resetDims.length,
      width: resetDims.width,
      height: resetDims.height,
      wheelbase: resetDims.wheelbase,
      maxGVWR: resetDims.maxGVWR,
    });
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>Novo Projeto</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                Nome do Projeto *
              </label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                Descrição
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                Tipo de Veículo
              </label>
              <Select
                value={formData.vehicleType}
                onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
              >
                <option value="sprinter">Sprinter</option>
                <option value="kombi">Kombi</option>
                <option value="furgao">Furgão</option>
                <option value="trailer">Trailer</option>
                <option value="custom">Custom</option>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                  Comprimento (mm)
                </label>
                <Input
                  type="number"
                  value={formData.length}
                  onChange={(e) => setFormData({ ...formData, length: parseFloat(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                  Largura (mm)
                </label>
                <Input
                  type="number"
                  value={formData.width}
                  onChange={(e) => setFormData({ ...formData, width: parseFloat(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                  Altura (mm)
                </label>
                <Input
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: parseFloat(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                  Wheelbase (mm)
                </label>
                <Input
                  type="number"
                  value={formData.wheelbase}
                  onChange={(e) => setFormData({ ...formData, wheelbase: parseFloat(e.target.value) })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                Peso Máximo (GVWR) - kg
              </label>
              <Input
                type="number"
                value={formData.maxGVWR}
                onChange={(e) => setFormData({ ...formData, maxGVWR: parseFloat(e.target.value) })}
              />
            </div>
          </div>
        </DialogContent>
        <DialogFooter>
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">
            Criar Projeto
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
