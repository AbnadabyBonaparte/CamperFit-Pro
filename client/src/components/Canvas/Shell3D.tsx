import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { getVehicleById, defaultVehicle, Vehicle } from '../../constants/vehicles';
import { getMaterialById } from '../../constants/materials';
import { FALLBACK_COLORS } from '../../../shared/consts/threeJsConstants';
import { getThemeColorForThree } from '../../utils/getThemeColorForThree';

export interface ShellParams {
  // Dimensões principais
  outerWidth: number; // mm - largura externa
  floorLength: number; // mm - comprimento do piso
  interiorHeight: number; // mm - altura interna
  
  // Alcova over-cab
  alcoveDepth: number; // mm - profundidade da alcova
  alcoveAngle: number; // graus - ângulo da alcova
  alcoveHeight: number; // mm - altura da alcova
  
  // Bojo traseiro
  bojoOffset: number; // mm - offset do bojo traseiro
  bojoRadius: number; // mm - raio do bojo
  
  // Roof
  roofPackage: number; // mm - altura adicional do teto (packaging)
  
  // Frame metalon
  showFrame: boolean;
  frameSize: '50x50' | '40x40' | '30x30'; // tamanho do metalon
  
  // Materiais
  externalMaterialId?: string;
  structureMaterialId?: string;
  insulationMaterialId?: string;
  internalMaterialId?: string;
}

interface Shell3DProps {
  vehicleId?: string;
  params: ShellParams;
  scene: THREE.Scene;
}

export function Shell3D({ vehicleId, params, scene }: Shell3DProps) {
  const vehicle: Vehicle = vehicleId ? getVehicleById(vehicleId) || defaultVehicle : defaultVehicle;
  const meshGroupRef = useRef<THREE.Group | null>(null);
  const frameGroupRef = useRef<THREE.Group | null>(null);
  const clearancePlaneRef = useRef<THREE.Mesh | null>(null);

  // Materials
  const externalMaterial = params.externalMaterialId 
    ? getMaterialById(params.externalMaterialId) 
    : null;
  const structureMaterial = params.structureMaterialId
    ? getMaterialById(params.structureMaterialId)
    : null;

  useEffect(() => {
    if (!scene) return;

    // Remover shell anterior se existir
    if (meshGroupRef.current) {
      scene.remove(meshGroupRef.current);
      meshGroupRef.current.traverse((obj) => {
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

    if (frameGroupRef.current) {
      scene.remove(frameGroupRef.current);
      frameGroupRef.current.traverse((obj) => {
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

    if (clearancePlaneRef.current) {
      scene.remove(clearancePlaneRef.current);
      if (clearancePlaneRef.current.geometry) clearancePlaneRef.current.geometry.dispose();
      if (clearancePlaneRef.current.material) {
        if (Array.isArray(clearancePlaneRef.current.material)) {
          clearancePlaneRef.current.material.forEach((mat) => mat.dispose());
        } else {
          clearancePlaneRef.current.material.dispose();
        }
      }
    }

    const shellGroup = new THREE.Group();
    meshGroupRef.current = shellGroup;

    // Cores dos materiais (Three.js requer hex)
    // Usar visualColor do material ou cor padrão neutra
    const externalColorHex = externalMaterial?.visualColor || FALLBACK_COLORS.surface;
    const structureColorHex = structureMaterial?.visualColor || FALLBACK_COLORS.border;
    const externalColor = new THREE.Color(
      getThemeColorForThree('--surface', externalColorHex)
    );
    const structureColor = new THREE.Color(
      getThemeColorForThree('--color-border', structureColorHex)
    );

    // === CORPO PRINCIPAL ===
    const mainBodyLength = params.floorLength;
    const mainBodyWidth = params.outerWidth;
    const mainBodyHeight = params.interiorHeight;
    
    const mainBodyGeometry = new THREE.BoxGeometry(
      mainBodyLength,
      mainBodyHeight,
      mainBodyWidth
    );
    const mainBodyMaterial = new THREE.MeshStandardMaterial({
      color: externalColor,
      metalness: 0.3,
      roughness: 0.7,
    });
    const mainBody = new THREE.Mesh(mainBodyGeometry, mainBodyMaterial);
    
    // Posicionar na caçamba (centralizado)
    const bedCenterX = vehicle.wheelbase / 2 + vehicle.cabLength;
    mainBody.position.set(
      bedCenterX + mainBodyLength / 2 - vehicle.bedLength / 2,
      mainBodyHeight / 2 + vehicle.bedDepth,
      0
    );
    mainBody.castShadow = true;
    mainBody.receiveShadow = true;
    shellGroup.add(mainBody);

    // === ALCOVA OVER-CAB ===
    if (params.alcoveDepth > 0) {
      const alcoveGeometry = new THREE.BoxGeometry(
        params.alcoveDepth,
        params.alcoveHeight,
        mainBodyWidth
      );
      const alcoveMaterial = new THREE.MeshStandardMaterial({
        color: externalColor,
        metalness: 0.3,
        roughness: 0.7,
      });
      const alcove = new THREE.Mesh(alcoveGeometry, alcoveMaterial);
      
      // Rotacionar alcova
      alcove.rotation.z = THREE.MathUtils.degToRad(params.alcoveAngle);
      
      // Posicionar sobre a cabine
      const alcoveX = vehicle.cabLength - params.alcoveDepth * Math.cos(THREE.MathUtils.degToRad(params.alcoveAngle));
      const alcoveY = vehicle.cabHeight + params.alcoveHeight / 2 + mainBodyHeight;
      alcove.position.set(alcoveX, alcoveY, 0);
      alcove.castShadow = true;
      alcove.receiveShadow = true;
      shellGroup.add(alcove);
    }

    // === BOJO TRASEIRO ===
    if (params.bojoOffset > 0 && params.bojoRadius > 0) {
      const bojoGeometry = new THREE.BoxGeometry(
        params.bojoRadius * 2,
        mainBodyHeight * 0.3,
        mainBodyWidth
      );
      const bojoMaterial = new THREE.MeshStandardMaterial({
        color: externalColor,
        metalness: 0.3,
        roughness: 0.7,
      });
      const bojo = new THREE.Mesh(bojoGeometry, bojoMaterial);
      
      // Posicionar na traseira
      const bojoX = bedCenterX + mainBodyLength / 2 - params.bojoOffset;
      const bojoY = mainBodyHeight / 2 + vehicle.bedDepth + params.bojoRadius;
      bojo.position.set(bojoX, bojoY, 0);
      bojo.castShadow = true;
      bojo.receiveShadow = true;
      shellGroup.add(bojo);
    }

    // === ROOF PACKAGE (altura adicional) ===
    if (params.roofPackage > 0) {
      const roofGeometry = new THREE.BoxGeometry(
        mainBodyLength,
        params.roofPackage,
        mainBodyWidth
      );
      const roofMaterial = new THREE.MeshStandardMaterial({
        color: externalColor,
        metalness: 0.4,
        roughness: 0.6,
      });
      const roof = new THREE.Mesh(roofGeometry, roofMaterial);
      roof.position.set(
        bedCenterX + mainBodyLength / 2 - vehicle.bedLength / 2,
        mainBodyHeight + vehicle.bedDepth + params.roofPackage / 2,
        0
      );
      roof.castShadow = true;
      roof.receiveShadow = true;
      shellGroup.add(roof);
    }

    // === FRAME METALON (opcional) ===
    if (params.showFrame) {
      const frameGroup = new THREE.Group();
      frameGroupRef.current = frameGroup;

      const frameSizeMap = {
        '50x50': 50,
        '40x40': 40,
        '30x30': 30,
      };
      const frameSize = frameSizeMap[params.frameSize];
      const frameThickness = frameSize === 50 ? 3 : frameSize === 40 ? 3 : 2;

      const frameMaterial = new THREE.MeshStandardMaterial({
        color: structureColor,
        metalness: 0.8,
        roughness: 0.2,
      });

      // Frame base (perímetro do piso)
      const frameBaseGeometry = new THREE.BoxGeometry(frameSize, frameSize, frameSize);
      
      // Frame vertical nos cantos
      const frameHeight = mainBodyHeight;
      const cornerFrameGeometry = new THREE.BoxGeometry(frameSize, frameHeight, frameSize);

      const corners = [
        { x: -mainBodyLength / 2, z: -mainBodyWidth / 2 },
        { x: mainBodyLength / 2, z: -mainBodyWidth / 2 },
        { x: mainBodyLength / 2, z: mainBodyWidth / 2 },
        { x: -mainBodyLength / 2, z: mainBodyWidth / 2 },
      ];

      corners.forEach((corner) => {
        const frameCorner = new THREE.Mesh(cornerFrameGeometry, frameMaterial);
        frameCorner.position.set(
          bedCenterX + corner.x + mainBodyLength / 2 - vehicle.bedLength / 2,
          vehicle.bedDepth + frameHeight / 2,
          corner.z
        );
        frameCorner.castShadow = true;
        frameGroup.add(frameCorner);
      });

      // Frame horizontal superior
      corners.forEach((corner, i) => {
        const nextCorner = corners[(i + 1) % corners.length];
        const length = Math.sqrt(
          Math.pow(nextCorner.x - corner.x, 2) + Math.pow(nextCorner.z - corner.z, 2)
        );
        const angle = Math.atan2(nextCorner.z - corner.z, nextCorner.x - corner.x);

        const frameTopGeometry = new THREE.BoxGeometry(length, frameSize, frameSize);
        const frameTop = new THREE.Mesh(frameTopGeometry, frameMaterial);
        frameTop.position.set(
          bedCenterX + (corner.x + nextCorner.x) / 2 + mainBodyLength / 2 - vehicle.bedLength / 2,
          vehicle.bedDepth + frameHeight,
          (corner.z + nextCorner.z) / 2
        );
        frameTop.rotation.y = angle;
        frameTop.castShadow = true;
        frameGroup.add(frameTop);
      });

      shellGroup.add(frameGroup);
    }

    // === CLEARANCE PLANE (verde/âmbar entre alcova e cabine) ===
    if (params.alcoveDepth > 0) {
      const clearanceDistance = calculateClearance(vehicle, params);
      // Cores de clearance baseadas em status (usar cores do tema: success, warning, error)
      // Three.js requer hex, então usamos getThemeColorForThree com fallbacks
      const getClearanceColorHex = (distance: number): number => {
        if (distance >= 100) {
          return getThemeColorForThree('--color-success', FALLBACK_COLORS.success);
        }
        if (distance >= 50) {
          return getThemeColorForThree('--color-warning', FALLBACK_COLORS.warning);
        }
        return getThemeColorForThree('--color-error', FALLBACK_COLORS.error);
      };
      const clearanceColor = new THREE.Color(getClearanceColorHex(clearanceDistance));
      
      const clearanceGeometry = new THREE.PlaneGeometry(mainBodyWidth, params.alcoveHeight);
      const clearanceMaterial = new THREE.MeshStandardMaterial({
        color: clearanceColor,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
      });
      const clearancePlane = new THREE.Mesh(clearanceGeometry, clearanceMaterial);
      
      // Posicionar entre alcova e cabine
      clearancePlane.position.set(
        vehicle.cabLength - params.alcoveDepth / 2,
        vehicle.cabHeight + params.alcoveHeight / 2,
        0
      );
      clearancePlane.rotation.y = Math.PI / 2;
      clearancePlaneRef.current = clearancePlane;
      shellGroup.add(clearancePlane);
    }

    scene.add(shellGroup);

    // Cleanup
    return () => {
      if (meshGroupRef.current) {
        scene.remove(meshGroupRef.current);
        meshGroupRef.current.traverse((obj) => {
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
      if (frameGroupRef.current) {
        scene.remove(frameGroupRef.current);
        frameGroupRef.current.traverse((obj) => {
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
      if (clearancePlaneRef.current) {
        scene.remove(clearancePlaneRef.current);
        if (clearancePlaneRef.current.geometry) clearancePlaneRef.current.geometry.dispose();
        if (clearancePlaneRef.current.material) {
          if (Array.isArray(clearancePlaneRef.current.material)) {
            clearancePlaneRef.current.material.forEach((mat) => mat.dispose());
          } else {
            clearancePlaneRef.current.material.dispose();
          }
        }
      }
    };
  }, [
    scene,
    vehicle,
    params.outerWidth,
    params.floorLength,
    params.interiorHeight,
    params.alcoveDepth,
    params.alcoveAngle,
    params.alcoveHeight,
    params.bojoOffset,
    params.bojoRadius,
    params.roofPackage,
    params.showFrame,
    params.frameSize,
    externalColor,
    structureColor,
  ]);

  return null; // Component não renderiza nada diretamente
}

/**
 * Calcular clearance entre alcova e cabine
 */
function calculateClearance(vehicle: Vehicle, params: ShellParams): number {
  const alcoveFrontX = vehicle.cabLength - params.alcoveDepth * Math.cos(THREE.MathUtils.degToRad(params.alcoveAngle));
  const cabineBackX = vehicle.cabLength;
  return cabineBackX - alcoveFrontX;
}

// calculateShellWeight moved to utils/shellWeightCalculator.ts

