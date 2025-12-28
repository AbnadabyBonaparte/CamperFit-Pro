import { useState, useEffect } from 'react';
import { useProjectStore } from '../../stores/projectStore';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { ColorInput } from '../ui/ColorInput';
import { FALLBACK_COLORS } from '../../../shared/consts/threeJsConstants';

interface Component {
  id: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  dimensions: { length: number; width: number; height: number };
  weight?: number;
  material?: string;
  color?: string;
}

interface ComponentFormProps {
  component: Component;
}

export function ComponentForm({ component }: ComponentFormProps) {
  const { updateComponent } = useProjectStore();

  const [position, setPosition] = useState(component.position);
  const [dimensions, setDimensions] = useState(component.dimensions);
  const [weight, setWeight] = useState(component.weight || 0);
  const [material, setMaterial] = useState(component.material || '');
  // Default color (neutral gray - matches theme text-secondary)
  const defaultColor = FALLBACK_COLORS.componentDefault;
  const [color, setColor] = useState(component.color || defaultColor);

  useEffect(() => {
    setPosition(component.position);
    setDimensions(component.dimensions);
    setWeight(component.weight || 0);
    setMaterial(component.material || '');
    setColor(component.color || defaultColor);
  }, [component]);

  const handleUpdate = (updates: Partial<Component>) => {
    updateComponent(component.id, updates);
  };

  return (
    <div className="space-y-4">
      {/* Position */}
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
          Posição (mm)
        </label>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>X</label>
            <Input
              type="number"
              value={position.x.toFixed(0)}
              onChange={(e) => {
                const newPos = { ...position, x: parseFloat(e.target.value) || 0 };
                setPosition(newPos);
                handleUpdate({ position: newPos });
              }}
            />
          </div>
          <div>
            <label className="block text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>Y</label>
            <Input
              type="number"
              value={position.y.toFixed(0)}
              onChange={(e) => {
                const newPos = { ...position, y: parseFloat(e.target.value) || 0 };
                setPosition(newPos);
                handleUpdate({ position: newPos });
              }}
            />
          </div>
          <div>
            <label className="block text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>Z</label>
            <Input
              type="number"
              value={position.z.toFixed(0)}
              onChange={(e) => {
                const newPos = { ...position, z: parseFloat(e.target.value) || 0 };
                setPosition(newPos);
                handleUpdate({ position: newPos });
              }}
            />
          </div>
        </div>
      </div>

      {/* Dimensions */}
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
          Dimensões (mm)
        </label>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>Comprimento</label>
            <Input
              type="number"
              value={dimensions.length.toFixed(0)}
              onChange={(e) => {
                const newDims = { ...dimensions, length: parseFloat(e.target.value) || 0 };
                setDimensions(newDims);
                handleUpdate({ dimensions: newDims });
              }}
            />
          </div>
          <div>
            <label className="block text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>Largura</label>
            <Input
              type="number"
              value={dimensions.width.toFixed(0)}
              onChange={(e) => {
                const newDims = { ...dimensions, width: parseFloat(e.target.value) || 0 };
                setDimensions(newDims);
                handleUpdate({ dimensions: newDims });
              }}
            />
          </div>
          <div>
            <label className="block text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>Altura</label>
            <Input
              type="number"
              value={dimensions.height.toFixed(0)}
              onChange={(e) => {
                const newDims = { ...dimensions, height: parseFloat(e.target.value) || 0 };
                setDimensions(newDims);
                handleUpdate({ dimensions: newDims });
              }}
            />
          </div>
        </div>
      </div>

      {/* Weight */}
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
          Peso (kg)
        </label>
        <Input
          type="number"
          value={weight}
          onChange={(e) => {
            const newWeight = parseFloat(e.target.value) || 0;
            setWeight(newWeight);
            handleUpdate({ weight: newWeight });
          }}
        />
      </div>

      {/* Material */}
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
          Material
        </label>
        <Input
          type="text"
          value={material}
          onChange={(e) => {
            setMaterial(e.target.value);
            handleUpdate({ material: e.target.value });
          }}
        />
      </div>

      {/* Color */}
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
          Cor
        </label>
        <div className="flex gap-2">
          <ColorInput
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
              handleUpdate({ color: e.target.value });
            }}
          />
          <Input
            type="text"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
              handleUpdate({ color: e.target.value });
            }}
          />
        </div>
      </div>
    </div>
  );
}

