import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
// @ts-ignore - Three.js examples types may not be perfect
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// @ts-ignore
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { useProjectStore } from '../../stores/projectStore';
import { useUIStore } from '../../stores/uiStore';
import { getComponentGeometry, getComponentMaterial } from './ModelLibrary';
import { Shell3D } from './Shell3D';
import { Vehicle3D } from './Vehicle3D';
import { defaultVehicle } from '../../constants/vehicles';

interface Canvas3DProps {
  width?: number;
  height?: number;
}

export function Canvas3D({ width = 1200, height = 800 }: Canvas3DProps) {
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

  const { components, selectComponent, selectedComponentId, currentProject } = useProjectStore();
  const { showGrid, showShell, showVehicle } = useUIStore();

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      10000
    );
    camera.position.set(5000, 3000, 5000);
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
    orbitControls.maxDistance = 10000;
    controlsRef.current = orbitControls;

    // Pointer Lock Controls (for first-person mode)
    const pointerLock = new PointerLockControls(camera, renderer.domElement);
    pointerLockRef.current = pointerLock;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5000, 10000, 5000);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Grid Helper
    const gridHelper = new THREE.GridHelper(10000, 100, 0x888888, 0xcccccc);
    gridHelper.visible = showGrid;
    scene.add(gridHelper);

    // Floor plane (for raycasting)
    const floorGeometry = new THREE.PlaneGeometry(10000, 10000);
    const floorMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xffffff,
      transparent: true,
      opacity: 0.1,
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

    containerRef.current.addEventListener('mousemove', handleMouseMove);
    containerRef.current.addEventListener('click', handleClick);

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
  }, [width, height, showGrid, isFirstPerson, selectComponent]);

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
        const componentType = (component as any).type || (component as any).componentType;
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

      // Update color
      if (mesh.material instanceof THREE.MeshStandardMaterial) {
        const newColor = component.color || '#6b7280';
        mesh.material.color.set(newColor);
      }

      // Update selection highlight
      const isSelected = component.id === selectedComponentId;
      if (mesh.material instanceof THREE.MeshStandardMaterial) {
        mesh.material.emissive.setHex(isSelected ? 0x4444ff : 0x000000);
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
        <button
          onClick={toggleFirstPerson}
          className={`px-3 py-2 rounded text-sm ${
            isFirstPerson
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {isFirstPerson ? 'Exit First-Person' : 'First-Person'}
        </button>
        {isFirstPerson && (
          <div className="bg-black bg-opacity-50 text-white text-xs p-2 rounded">
            WASD: Move | Mouse: Look | ESC: Exit
          </div>
        )}
      </div>
    </div>
  );
}

