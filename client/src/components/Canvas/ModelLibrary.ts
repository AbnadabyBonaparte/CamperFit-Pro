import * as THREE from 'three';

/**
 * Model library for different component types
 * Returns appropriate geometry based on component type
 */
export function getComponentGeometry(
  componentType: string | undefined,
  dimensions: { length: number; width: number; height: number }
): THREE.BufferGeometry {
  const { length, width, height } = dimensions;

  // Default to box if no type specified
  if (!componentType) {
    return new THREE.BoxGeometry(length, height, width);
  }

  // Map component types to geometries
  switch (componentType.toLowerCase()) {
    case 'bed':
    case 'cama':
      return new THREE.BoxGeometry(length, height, width);

    case 'tank':
    case 'tanque':
      // Cylindrical tank
      const radius = Math.max(length, width) / 2;
      return new THREE.CylinderGeometry(radius, radius, height, 32);

    case 'battery':
    case 'bateria':
      return new THREE.BoxGeometry(length, height, width);

    case 'table':
    case 'mesa':
      // Table with legs (simplified as box for now)
      return new THREE.BoxGeometry(length, height, width);

    case 'refrigerator':
    case 'geladeira':
      return new THREE.BoxGeometry(length, height, width);

    case 'stove':
    case 'fogao':
      return new THREE.BoxGeometry(length, height, width);

    case 'cabinet':
    case 'armario':
      return new THREE.BoxGeometry(length, height, width);

    case 'sofa':
    case 'sofa-cama':
      return new THREE.BoxGeometry(length, height, width);

    case 'cylinder':
    case 'cilindro':
      const cylRadius = Math.max(length, width) / 2;
      return new THREE.CylinderGeometry(cylRadius, cylRadius, height, 32);

    case 'sphere':
    case 'esfera':
      const sphereRadius = Math.max(length, width, height) / 2;
      return new THREE.SphereGeometry(sphereRadius, 32, 32);

    default:
      return new THREE.BoxGeometry(length, height, width);
  }
}

/**
 * Get material for component
 */
export function getComponentMaterial(color: string | undefined): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: color || '#6b7280',
    metalness: 0.3,
    roughness: 0.7,
  });
}

