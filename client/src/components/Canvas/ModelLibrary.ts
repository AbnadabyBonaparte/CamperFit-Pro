import * as THREE from 'three';
import { FALLBACK_COLORS } from '../../../shared/consts/threeJsConstants';

/**
 * Model library for different component types
 * Returns appropriate geometry based on component type or geometryType
 */
export function getComponentGeometry(
  componentType: string | undefined,
  dimensions: { length: number; width: number; height: number },
  geometryType?: 'box' | 'cylinder' | 'custom'
): THREE.BufferGeometry {
  const { length, width, height } = dimensions;

  // If geometryType is explicitly provided, use it
  if (geometryType) {
    if (geometryType === 'cylinder') {
      const radius = Math.max(length, width) / 2;
      return new THREE.CylinderGeometry(radius, radius, height, 32);
    }
    return new THREE.BoxGeometry(length, height, width);
  }

  // Default to box if no type specified
  if (!componentType) {
    return new THREE.BoxGeometry(length, height, width);
  }

  // Map component types to geometries
  switch (componentType.toLowerCase()) {
    case 'bed':
    case 'cama':
    case 'bed-double':
    case 'bed-single':
    case 'sofa-bed':
      return new THREE.BoxGeometry(length, height, width);

    case 'tank':
    case 'tanque':
    case 'water-tank':
    case 'gas-tank':
      // Cylindrical tank
      const radius = Math.max(length, width) / 2;
      return new THREE.CylinderGeometry(radius, radius, height, 32);

    case 'battery':
    case 'bateria':
    case 'battery-200ah':
      return new THREE.BoxGeometry(length, height, width);

    case 'table':
    case 'mesa':
    case 'table-foldable':
      return new THREE.BoxGeometry(length, height, width);

    case 'refrigerator':
    case 'geladeira':
    case 'fridge-12v':
      return new THREE.BoxGeometry(length, height, width);

    case 'stove':
    case 'fogao':
    case 'stove-2burners':
      return new THREE.BoxGeometry(length, height, width);

    case 'cabinet':
    case 'armario':
    case 'cabinet-overhead':
    case 'cabinet-floor':
    case 'drawer-unit':
      return new THREE.BoxGeometry(length, height, width);

    case 'sofa':
    case 'sofa-cama':
      return new THREE.BoxGeometry(length, height, width);

    case 'kitchen':
    case 'kitchen-compact':
      return new THREE.BoxGeometry(length, height, width);

    case 'cylinder':
    case 'cilindro':
      const cylRadius = Math.max(length, width) / 2;
      return new THREE.CylinderGeometry(cylRadius, cylRadius, height, 32);

    case 'sphere':
    case 'esfera':
      const sphereRadius = Math.max(length, width, height) / 2;
      return new THREE.SphereGeometry(sphereRadius, 32, 32);

    case 'bathroom':
    case 'bathroom-box':
    case 'shower-box':
      return new THREE.BoxGeometry(length, height, width);

    case 'chair':
    case 'chair-foldable':
      return new THREE.BoxGeometry(length, height, width);

    case 'solar-panel':
    case 'solar-panel-300w':
      return new THREE.BoxGeometry(length, height, width);

    case 'inverter':
    case 'inverter-1000w':
      return new THREE.BoxGeometry(length, height, width);

    case 'charge-controller':
    case 'charge-controller-30a':
      return new THREE.BoxGeometry(length, height, width);

    default:
      return new THREE.BoxGeometry(length, height, width);
  }
}

/**
 * Get material for component
 */
export function getComponentMaterial(color: string | undefined): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: color || FALLBACK_COLORS.componentDefault,
    metalness: 0.3,
    roughness: 0.7,
  });
}

