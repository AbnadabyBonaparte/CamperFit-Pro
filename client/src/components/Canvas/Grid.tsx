import { useUIStore } from '../../stores/uiStore';
import { FALLBACK_COLORS } from '../../../shared/consts/threeJsConstants';

interface GridProps {
  width: number;
  height: number;
}

export function Grid({ width, height }: GridProps) {
  const { showGrid, gridSize, zoom, pan } = useUIStore();

  if (!showGrid) return null;

  const lines: JSX.Element[] = [];
  const spacing = gridSize * zoom;
  const strokeColor = `var(--color-border, ${FALLBACK_COLORS.border})`;

  // Vertical lines
  const startX = Math.floor(pan.x / spacing) * spacing;
  for (let x = startX; x < width + pan.x; x += spacing) {
    lines.push(
      <line
        key={`v-${x}`}
        x1={x - pan.x}
        y1={0}
        x2={x - pan.x}
        y2={height}
        stroke={strokeColor}
        strokeWidth={1}
      />
    );
  }

  // Horizontal lines
  const startY = Math.floor(pan.y / spacing) * spacing;
  for (let y = startY; y < height + pan.y; y += spacing) {
    lines.push(
      <line
        key={`h-${y}`}
        x1={0}
        y1={y - pan.y}
        x2={width}
        y2={y - pan.y}
        stroke={strokeColor}
        strokeWidth={1}
      />
    );
  }

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      width={width}
      height={height}
    >
      {lines}
    </svg>
  );
}

