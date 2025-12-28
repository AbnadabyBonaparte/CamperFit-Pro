import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface UseDragAndDrop3DProps {
  scene: THREE.Scene | null;
  camera: THREE.Camera | null;
  container: HTMLElement | null;
  gridSize?: number; // mm
  onDrop?: (position: { x: number; y: number; z: number }) => void;
}

/**
 * Hook para drag-and-drop 3D
 * Detecta posição no chão usando raycaster
 */
export function useDragAndDrop3D({
  scene,
  camera,
  container,
  gridSize = 50,
  onDrop,
}: UseDragAndDrop3DProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState<THREE.Vector3 | null>(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());

  useEffect(() => {
    if (!container || !scene || !camera) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging) return;
      
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      
      // Intersectar com plano do chão (Y = 0)
      const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
      const intersectionPoint = new THREE.Vector3();
      raycasterRef.current.ray.intersectPlane(plane, intersectionPoint);
      
      if (intersectionPoint) {
        // Snap to grid
        intersectionPoint.x = Math.round(intersectionPoint.x / gridSize) * gridSize;
        intersectionPoint.y = 0; // Floor level
        intersectionPoint.z = Math.round(intersectionPoint.z / gridSize) * gridSize;
        
        setDragPosition(intersectionPoint.clone());
      }
    };

    const handleMouseUp = (event: MouseEvent) => {
      if (!isDragging) return;
      
      setIsDragging(false);
      
      if (dragPosition && onDrop) {
        onDrop({
          x: dragPosition.x,
          y: dragPosition.y,
          z: dragPosition.z,
        });
      }
      
      setDragPosition(null);
    };

    if (isDragging) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseup', handleMouseUp);
    };
  }, [container, scene, camera, isDragging, dragPosition, gridSize, onDrop]);

  const startDrag = () => {
    setIsDragging(true);
  };

  return {
    isDragging,
    dragPosition,
    startDrag,
  };
}

