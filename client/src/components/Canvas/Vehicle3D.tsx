import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Vehicle, getVehicleById, defaultVehicle } from '../../constants/vehicles';
import { FALLBACK_COLORS } from '../../../shared/consts/threeJsConstants';
import { getThemeColorForThree } from '../../utils/getThemeColorForThree';
import { TIRE_WIDTH_MM } from '../../../shared/const';

interface Vehicle3DProps {
  vehicleId?: string;
  scene: THREE.Scene;
}

/**
 * Renderiza um veículo pickup simplificado em 3D
 */
export function Vehicle3D({ vehicleId, scene }: Vehicle3DProps) {
  const vehicle: Vehicle = vehicleId ? getVehicleById(vehicleId) || defaultVehicle : defaultVehicle;
  const vehicleGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!scene) return;

    // Remover veículo anterior
    if (vehicleGroupRef.current) {
      scene.remove(vehicleGroupRef.current);
      vehicleGroupRef.current.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((mat) => mat.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
    }

    const vehicleGroup = new THREE.Group();
    vehicleGroupRef.current = vehicleGroup;

    // Material do veículo (Three.js requer hex)
    // Usar cor neutra escura para veículo
    const vehicleMaterial = new THREE.MeshStandardMaterial({
      color: getThemeColorForThree('--text-primary', FALLBACK_COLORS.vehicleBody),
      metalness: 0.7,
      roughness: 0.3,
    });

    // === CABINE ===
    const cabGeometry = new THREE.BoxGeometry(vehicle.cabLength, vehicle.cabHeight, vehicle.cabWidth);
    const cab = new THREE.Mesh(cabGeometry, vehicleMaterial);
    cab.position.set(vehicle.cabLength / 2, vehicle.cabHeight / 2 + vehicle.groundClearance, 0);
    cab.castShadow = true;
    cab.receiveShadow = true;
    vehicleGroup.add(cab);

    // === CAÇAMBA ===
    const bedGeometry = new THREE.BoxGeometry(
      vehicle.bedLength,
      vehicle.bedDepth,
      vehicle.bedWidthExt
    );
    const bed = new THREE.Mesh(bedGeometry, vehicleMaterial);
    bed.position.set(
      vehicle.cabLength + vehicle.bedLength / 2,
      vehicle.bedDepth / 2 + vehicle.groundClearance,
      0
    );
    bed.castShadow = true;
    bed.receiveShadow = true;
    vehicleGroup.add(bed);

    // === RODAS (simplificadas como cilindros) ===
    // Three.js requer hex - usar preto padrão para rodas
    const wheelMaterial = new THREE.MeshStandardMaterial({
      color: getThemeColorForThree('--text-primary', FALLBACK_COLORS.wheel),
      metalness: 0.1,
      roughness: 0.9,
    });

    const wheelPositions = [
      { x: vehicle.wheelbase * 0.3, z: vehicle.wheelTrack / 2 }, // Frente direita
      { x: vehicle.wheelbase * 0.3, z: -vehicle.wheelTrack / 2 }, // Frente esquerda
      { x: vehicle.cabLength + vehicle.bedLength * 0.3, z: vehicle.wheelTrack / 2 }, // Traseira direita
      { x: vehicle.cabLength + vehicle.bedLength * 0.3, z: -vehicle.wheelTrack / 2 }, // Traseira esquerda
    ];

    wheelPositions.forEach((pos) => {
      const wheelGeometry = new THREE.CylinderGeometry(
        vehicle.tireDiameter / 2,
        vehicle.tireDiameter / 2,
        TIRE_WIDTH_MM, // Largura do pneu (constante de shared/const.ts)
        16
      );
      const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(pos.x, vehicle.tireDiameter / 2, pos.z);
      wheel.castShadow = true;
      wheel.receiveShadow = true;
      vehicleGroup.add(wheel);
    });

    // === CHASSI (simplificado) ===
    const chassisGeometry = new THREE.BoxGeometry(
      vehicle.totalLength,
      100, // Altura do chassi
      vehicle.totalWidth
    );
    // Chassi (Three.js requer hex)
    const chassisMaterial = new THREE.MeshStandardMaterial({
      color: getThemeColorForThree('--text-secondary', FALLBACK_COLORS.chassis),
      metalness: 0.8,
      roughness: 0.2,
    });
    const chassis = new THREE.Mesh(chassisGeometry, chassisMaterial);
    chassis.position.set(
      vehicle.totalLength / 2,
      vehicle.groundClearance / 2,
      0
    );
    chassis.castShadow = true;
    chassis.receiveShadow = true;
    vehicleGroup.add(chassis);

    scene.add(vehicleGroup);

    // Cleanup
    return () => {
      if (vehicleGroupRef.current) {
        scene.remove(vehicleGroupRef.current);
        vehicleGroupRef.current.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            obj.geometry.dispose();
            if (Array.isArray(obj.material)) {
              obj.material.forEach((mat) => mat.dispose());
            } else {
              obj.material.dispose();
            }
          }
        });
      }
    };
  }, [scene, vehicle]);

  return null;
}

