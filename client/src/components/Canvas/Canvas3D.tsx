import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
// @ts-expect-error - Three.js examples types may not be perfect, but OrbitControls works correctly
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// @ts-expect-error - Three.js examples types may not be perfect, but PointerLockControls works correctly
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { useProjectStore } from '../../stores/projectStore';
import { useUIStore } from '../../stores/uiStore';
import { getComponentGeometry, getComponentMaterial } from './ModelLibrary';
import { Shell3D } from './Shell3D';
import { Vehicle3D } from './Vehicle3D';
import { Button } from '../ui/Button';
import { CANVAS_DEFAULT_WIDTH, CANVAS_DEFAULT_HEIGHT } from '@/shared/const';
import {
  CAMERA_FAR,
  CAMERA_FOV,
  CAMERA_NEAR,
  CAMERA_START_POSITION,
  FALLBACK_COLORS,
  FLOOR_OPACITY,
  FLOOR_SIZE,
  GRID_DIVISIONS,
  GRID_SNAP_SIZE,
  GRID_WORLD_SIZE,
  LIGHT_POSITIONS,
  SHADOW_MAP_SIZE,
} from '@/shared/consts/threeJsConstants';
import { getThemeColorForThree } from '../../utils/getThemeColorForThree';

interface Canvas3DProps {
  width?: number;
  height?: number;
}

export function Canvas3D({ width = CANVAS_DEFAULT_WIDTH, height = CANVAS_DEFAULT_HEIGHT }: Canvas3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const pointerLockRef = useRef<PointerLockControls | null>(null);
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef({ x: 0, y: 0 });
  const meshMapRef = useRef<Map<string, THREE.Mesh>>(new Map());
  const animationFrameRef = useRef<number | null>(null);
  const [isFirstPerson, setIsFirstPerson] = useState(false);

  const { components, selectComponent, selectedComponentId, currentProject, addComponent } = useProjectStore();
  const { showGrid, showShell, showVehicle } = useUIStore();

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    const sceneBackground = getThemeColorForThree('--surface', FALLBACK_COLORS.sceneBackground);
    scene.background = new THREE.Color(sceneBackground);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(CAMERA_FOV, width / height, CAMERA_NEAR, CAMERA_FAR);
    camera.position.set(
      CAMERA_START_POSITION.x,
      CAMERA_START_POSITION.y,
      CAMERA_START_POSITION.z
    );
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Orbit Controls
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;
    orbitControls.dampingFactor = 0.05;
    orbitControls.minDistance = 100;
    orbitControls.maxDistance = CAMERA_FAR;
    controlsRef.current = orbitControls;

    // Pointer Lock Controls (for first-person mode)
    const pointerLock = new PointerLockControls(camera, renderer.domElement);
    pointerLockRef.current = pointerLock;

    // Lights
    const ambientLight = new THREE.AmbientLight(
      getThemeColorForThree('--color-surface', FALLBACK_COLORS.ambientLight),
      0.6
    );
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(
      getThemeColorForThree('--color-surface', FALLBACK_COLORS.directionalLight),
      0.8
    );
    directionalLight.position.set(
      LIGHT_POSITIONS.directional.x,
      LIGHT_POSITIONS.directional.y,
      LIGHT_POSITIONS.directional.z
    );
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = SHADOW_MAP_SIZE;
    directionalLight.shadow.mapSize.height = SHADOW_MAP_SIZE;
    scene.add(directionalLight);

    // Grid Helper
    const gridPrimary = getThemeColorForThree('--color-border', FALLBACK_COLORS.gridPrimary);
    const gridSecondary = getThemeColorForThree('--color-border', FALLBACK_COLORS.gridSecondary);
    const gridHelper = new THREE.GridHelper(GRID_WORLD_SIZE, GRID_DIVISIONS, gridPrimary, gridSecondary);
    gridHelper.visible = showGrid;
    scene.add(gridHelper);

    // Floor plane (for raycasting)
    const floorGeometry = new THREE.PlaneGeometry(FLOOR_SIZE, FLOOR_SIZE);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: getThemeColorForThree('--surface', FALLBACK_COLORS.floor),
      transparent: true,
      opacity: FLOOR_OPACITY,
      side: THREE.DoubleSide
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.name = 'floor';
    scene.add(floor);

    // Mouse move for raycasting
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / height) * 2 + 1;
    };

    // Click handler for component selection
    const handleClick = (event: MouseEvent) => {
      if (!cameraRef.current || !sceneRef.current || !containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / width) * 2 - 1;
      const y = -((event.clientY - rect.top) / height) * 2 + 1;

      raycasterRef.current.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);
      
      const meshes = Array.from(meshMapRef.current.values());
      const intersects = raycasterRef.current.intersectObjects(meshes);

      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object as THREE.Mesh;
        const componentId = clickedMesh.userData.componentId;
        if (componentId) {
          selectComponent(componentId);
        }
      } else {
        selectComponent(null);
      }
    };

    // Drag and drop handler
    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
      event.dataTransfer!.dropEffect = 'copy';
    };

    const handleDrop = (event: DragEvent) => {
      event.preventDefault();
      
      const componentLibraryId = event.dataTransfer?.getData('component-library-id');
      if (!componentLibraryId || !cameraRef.current || !containerRef.current) return;

      // Import component library
      import('../../constants/componentLibrary').then(({ getComponentById }) => {
        const componentTemplate = getComponentById(componentLibraryId);
        if (!componentTemplate) return;

        const rect = containerRef.current!.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / width) * 2 - 1;
        const y = -((event.clientY - rect.top) / height) * 2 + 1;

        raycasterRef.current.setFromCamera(new THREE.Vector2(x, y), cameraRef.current!);
        
        // Intersectar com plano do chão
        const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
        const intersectionPoint = new THREE.Vector3();
        raycasterRef.current.ray.intersectPlane(plane, intersectionPoint);
        
        if (intersectionPoint) {
          // Snap to grid (50mm)
          const gridSize = GRID_SNAP_SIZE;
          intersectionPoint.x = Math.round(intersectionPoint.x / gridSize) * gridSize;
          intersectionPoint.y = intersectionPoint.y; // Keep Y as is (will be adjusted by component height)
          intersectionPoint.z = Math.round(intersectionPoint.z / gridSize) * gridSize;

          const newComponent = {
            id: `comp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            componentLibraryId: componentLibraryId,
            position: {
              x: intersectionPoint.x,
              y: intersectionPoint.z, // Z -> Y (canvas coordinate system)
              z: intersectionPoint.y + componentTemplate.dimensions.height / 2, // Y -> Z with height offset
            },
            rotation: { x: 0, y: 0, z: 0 },
            dimensions: componentTemplate.dimensions,
            weight: componentTemplate.weight,
            color: componentTemplate.defaultColor,
            material: componentTemplate.properties?.material,
          };

          addComponent(newComponent);
        }
      });
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);
    containerRef.current.addEventListener('click', handleClick);
    containerRef.current.addEventListener('dragover', handleDragOver);
    containerRef.current.addEventListener('drop', handleDrop);

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      if (controlsRef.current && !isFirstPerson) {
        controlsRef.current.update();
      }

      if (pointerLockRef.current && isFirstPerson) {
        pointerLockRef.current.lock();
      }

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      containerRef.current?.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeEventListener('click', handleClick);
      containerRef.current?.removeEventListener('dragover', handleDragOver);
      containerRef.current?.removeEventListener('drop', handleDrop);
      
      // Dispose geometries and materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((mat) => mat.dispose());
          } else {
            object.material.dispose();
          }
        }
      });

      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [width, height, showGrid, isFirstPerson, selectComponent, addComponent]);

  // Update grid visibility
  useEffect(() => {
    if (!sceneRef.current) return;
    sceneRef.current.traverse((object) => {
      if (object instanceof THREE.GridHelper) {
        object.visible = showGrid;
      }
    });
  }, [showGrid]);

  // Render components as 3D meshes
  useEffect(() => {
    if (!sceneRef.current || !meshMapRef.current) return;

    const scene = sceneRef.current;
    const meshMap = meshMapRef.current;

    // Remove old meshes that are no longer in components
    const currentIds = new Set(components.map((c) => c.id));
    meshMap.forEach((mesh, id) => {
      if (!currentIds.has(id)) {
        scene.remove(mesh);
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => mat.dispose());
        } else {
          mesh.material.dispose();
        }
        meshMap.delete(id);
      }
    });

    // Add/update component meshes
    components.forEach((component) => {
      let mesh = meshMap.get(component.id);

      if (!mesh) {
        // Get geometry from model library based on component type
        // Use componentLibraryId if available, otherwise use a default type
        const componentType = component.componentLibraryId || 'box';
        const geometry = getComponentGeometry(componentType, {
          length: component.dimensions.length || 100,
          width: component.dimensions.width || 100,
          height: component.dimensions.height || 100,
        });

        const material = getComponentMaterial(component.color);

        mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.userData.componentId = component.id;
        meshMap.set(component.id, mesh);
        scene.add(mesh);
      }

      // Update position
      mesh.position.set(
        component.position.x || 0,
        (component.position.z || 0) + (component.dimensions.height || 0) / 2,
        component.position.y || 0
      );

      // Update rotation
      mesh.rotation.set(
        THREE.MathUtils.degToRad(component.rotation.x || 0),
        THREE.MathUtils.degToRad(component.rotation.y || 0),
        THREE.MathUtils.degToRad(component.rotation.z || 0)
      );

      // Note: Geometry updates are handled when mesh is created
      // For performance, we don't recreate geometry on every render
      // If dimensions change significantly, the component should be recreated

      // Update color (use component color or default from theme)
      if (mesh.material instanceof THREE.MeshStandardMaterial) {
        const defaultColor = component.color || FALLBACK_COLORS.componentDefault;
        mesh.material.color.set(defaultColor);

        const primaryHex = getThemeColorForThree('--color-primary', FALLBACK_COLORS.selection);
        const neutralHex = parseInt(FALLBACK_COLORS.emissiveOff.replace('#', ''), 16);
        const isSelected = component.id === selectedComponentId;
        mesh.material.emissive.setHex(isSelected ? primaryHex : neutralHex);
        mesh.material.emissiveIntensity = isSelected ? 0.3 : 0;
      }
    });
  }, [components, selectedComponentId]);

  // First-person movement controls
  useEffect(() => {
    if (!pointerLockRef.current || !cameraRef.current) return;

    const keys: Record<string, boolean> = {};
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isFirstPerson) return;
      keys[event.code] = true;
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      keys[event.code] = false;
    };

    const moveCamera = () => {
      if (!isFirstPerson || !cameraRef.current) return;

      const moveSpeed = 5;
      const direction = new THREE.Vector3();

      if (keys['KeyW']) direction.z -= 1;
      if (keys['KeyS']) direction.z += 1;
      if (keys['KeyA']) direction.x -= 1;
      if (keys['KeyD']) direction.x += 1;

      if (direction.length() > 0) {
        direction.normalize();
        direction.multiplyScalar(moveSpeed);
        direction.applyQuaternion(cameraRef.current.quaternion);
        cameraRef.current.position.add(direction);
      }

      requestAnimationFrame(moveCamera);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    if (isFirstPerson) {
      moveCamera();
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isFirstPerson]);

  // Toggle first-person mode
  const toggleFirstPerson = () => {
    if (!pointerLockRef.current || !controlsRef.current) return;

    const newMode = !isFirstPerson;
    setIsFirstPerson(newMode);

    if (newMode) {
      controlsRef.current.enabled = false;
      pointerLockRef.current.lock();
    } else {
      pointerLockRef.current.unlock();
      controlsRef.current.enabled = true;
    }
  };

  return (
    <div className="relative w-full h-full">
      <div
        ref={containerRef}
        className="w-full h-full"
        style={{ cursor: isFirstPerson ? 'none' : 'default' }}
      />
      
      {/* Controls overlay */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button
          variant={isFirstPerson ? 'primary' : 'ghost'}
          size="sm"
          onClick={toggleFirstPerson}
        >
          {isFirstPerson ? 'Exit First-Person' : 'First-Person'}
        </Button>
        {isFirstPerson && (
          <div className="text-xs p-2 rounded" style={{ backgroundColor: 'var(--overlay-background, rgba(0, 0, 0, 0.5))', color: 'var(--text-primary)' }}>
            WASD: Move | Mouse: Look | ESC: Exit
          </div>
        )}
      </div>
    </div>
  );
}

