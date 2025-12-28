import { useEffect, useRef, useState, useCallback } from 'react';
import { useProjectStore } from '../../stores/projectStore';
import { useUIStore } from '../../stores/uiStore';
import { CANVAS_DEFAULT_WIDTH, CANVAS_DEFAULT_HEIGHT } from '../../../shared/const';

interface Canvas2DProps {
  width?: number;
  height?: number;
}

export function Canvas2D({ width = CANVAS_DEFAULT_WIDTH, height = CANVAS_DEFAULT_HEIGHT }: Canvas2DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef({ x: 0, y: 0 });

  const { components, selectComponent, updateComponent } = useProjectStore();
  const { showGrid, gridSize, zoom, pan, setPan } = useUIStore();

  // Draw grid
  const drawGrid = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    if (!showGrid) return;

    // Use CSS variable for grid color (convert to hex for canvas)
    // Default to gray-200 (#e5e7eb) if CSS variable not available
    const gridColor = getComputedStyle(document.documentElement).getPropertyValue('--color-border').trim() || '#e5e7eb';
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;

    const startX = Math.floor(pan.x / (gridSize * zoom)) * gridSize * zoom;
    const startY = Math.floor(pan.y / (gridSize * zoom)) * gridSize * zoom;

    for (let x = startX; x < width + pan.x; x += gridSize * zoom) {
      ctx.beginPath();
      ctx.moveTo(x - pan.x, 0);
      ctx.lineTo(x - pan.x, height);
      ctx.stroke();
    }

    for (let y = startY; y < height + pan.y; y += gridSize * zoom) {
      ctx.beginPath();
      ctx.moveTo(0, y - pan.y);
      ctx.lineTo(width, y - pan.y);
      ctx.stroke();
    }
  }, [showGrid, gridSize, zoom, pan]);

  // Draw components
  const drawComponents = useCallback((ctx: CanvasRenderingContext2D) => {
    components.forEach((component) => {
      const x = (component.position.x * zoom) - pan.x;
      const y = (component.position.y * zoom) - pan.y;
      const w = component.dimensions.length * zoom;
      const h = component.dimensions.width * zoom;

      // Draw component rectangle
      // Use CSS variables for colors (convert to hex for canvas)
      const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#3b82f6';
      const primaryDarkColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#1d4ed8';
      const textColor = getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim() || '#374151';
      const surfaceColor = getComputedStyle(document.documentElement).getPropertyValue('--color-surface').trim() || '#ffffff';
      const defaultComponentColor = '#6b7280'; // Neutral gray
      
      ctx.fillStyle = component.selected ? primaryColor : component.color || defaultComponentColor;
      ctx.strokeStyle = component.selected ? primaryDarkColor : textColor;
      ctx.lineWidth = component.selected ? 3 : 2;

      ctx.fillRect(x, y, w, h);
      ctx.strokeRect(x, y, w, h);

      // Draw label (use surface color for text background)
      ctx.fillStyle = surfaceColor;
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        component.id.slice(0, 8),
        x + w / 2,
        y + h / 2
      );
    });
  }, [components, zoom, pan]);

  // Render canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw grid
    drawGrid(ctx, width, height);

    // Draw components
    drawComponents(ctx);
  }, [width, height, drawGrid, drawComponents]);

  // Handle mouse down
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) + pan.x;
    const y = (e.clientY - rect.top) + pan.y;

    // Check if clicking on a component
    const clickedComponent = components.find((comp) => {
      const compX = comp.position.x * zoom;
      const compY = comp.position.y * zoom;
      const compW = comp.dimensions.length * zoom;
      const compH = comp.dimensions.width * zoom;

      return (
        x >= compX &&
        x <= compX + compW &&
        y >= compY &&
        y <= compY + compH
      );
    });

    if (clickedComponent) {
      // Start dragging component
      selectComponent(clickedComponent.id);
      setIsDragging(true);
      setDragStart({
        x: x / zoom - clickedComponent.position.x,
        y: y / zoom - clickedComponent.position.y,
      });
    } else if (e.button === 1 || (e.button === 0 && e.ctrlKey)) {
      // Start panning (middle click or Ctrl+left click)
      setIsPanning(true);
      panStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    } else {
      // Deselect
      selectComponent(null);
    }
  }, [components, zoom, pan, selectComponent]);

  // Handle mouse move
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) + pan.x;
    const y = (e.clientY - rect.top) + pan.y;

    if (isDragging) {
      const selectedComponent = components.find((comp) => comp.selected);
      if (selectedComponent) {
        updateComponent(selectedComponent.id, {
          position: {
            x: (x / zoom) - dragStart.x,
            y: (y / zoom) - dragStart.y,
            z: selectedComponent.position.z,
          },
        });
      }
    } else if (isPanning) {
      setPan({
        x: e.clientX - panStartRef.current.x,
        y: e.clientY - panStartRef.current.y,
      });
    }
  }, [isDragging, isPanning, components, zoom, pan, dragStart, updateComponent, setPan]);

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsPanning(false);
  }, []);

  // Handle wheel zoom
  const handleWheel = useCallback((e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.max(0.1, Math.min(5, zoom * delta));
    const uiStore = useUIStore.getState();
    uiStore.setZoom(newZoom);
  }, [zoom]);

  return (
    <div className="relative w-full h-full rounded border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--color-border)' }}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="w-full h-full cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      />
    </div>
  );
}

