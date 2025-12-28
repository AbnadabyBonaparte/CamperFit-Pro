import * as THREE from 'three';

/**
 * Geometry cache to reuse geometries and improve performance
 */
class GeometryCache {
  private cache = new Map<string, THREE.BufferGeometry>();

  get(key: string, factory: () => THREE.BufferGeometry): THREE.BufferGeometry {
    if (!this.cache.has(key)) {
      this.cache.set(key, factory());
    }
    return this.cache.get(key)!;
  }

  clear() {
    this.cache.forEach((geometry) => geometry.dispose());
    this.cache.clear();
  }
}

export const geometryCache = new GeometryCache();

