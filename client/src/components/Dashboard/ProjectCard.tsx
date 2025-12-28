import { Link } from 'react-router-dom';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

// Temporary Project type (should match backend)
interface Project {
  id: string;
  name: string;
  description?: string | null;
  vehicleType?: string | null;
  status?: 'draft' | 'in_progress' | 'completed' | 'archived' | null;
  length?: number | null;
  width?: number | null;
  height?: number | null;
  totalWeight?: number | null;
  cgX?: number | null;
  cgY?: number | null;
  cgZ?: number | null;
  createdAt: Date | string;
  updatedAt?: Date | string | null;
}

interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

export function ProjectCard({ project, onDelete, onDuplicate }: ProjectCardProps) {
  const statusColors = {
    draft: 'var(--text-secondary)',
    in_progress: 'var(--color-warning)',
    completed: 'var(--color-success)',
    archived: 'var(--text-secondary)',
  };

  const statusLabels = {
    draft: 'Rascunho',
    in_progress: 'Em Progresso',
    completed: 'Completo',
    archived: 'Arquivado',
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <Link
            to={`/editor/${project.id}`}
            className="flex-1 hover:opacity-80 transition-opacity"
          >
            <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
              {project.name}
            </h3>
            {project.description && (
              <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                {project.description}
              </p>
            )}
          </Link>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span
            className="text-xs px-2 py-1 rounded"
            style={{
              backgroundColor: statusColors[project.status || 'draft'] + '20',
              color: statusColors[project.status || 'draft'],
            }}
          >
            {statusLabels[project.status || 'draft']}
          </span>
          {project.vehicleType && (
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {project.vehicleType}
            </span>
          )}
        </div>

        {(project.totalWeight || project.length) && (
          <div className="space-y-1 mb-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
            {project.totalWeight && (
              <div>Peso: {project.totalWeight.toFixed(1)} kg</div>
            )}
            {project.length && project.width && project.height && (
              <div>
                {project.length.toFixed(0)} × {project.width.toFixed(0)} ×{' '}
                {project.height.toFixed(0)} mm
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1"
            onClick={() => onDuplicate(project.id)}
          >
            Duplicar
          </Button>
          <Button
            variant="danger"
            size="sm"
            className="flex-1"
            onClick={() => {
              if (confirm('Tem certeza que deseja deletar este projeto?')) {
                onDelete(project.id);
              }
            }}
          >
            Deletar
          </Button>
        </div>

        {project.updatedAt && (
          <div className="text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>
            Atualizado em {new Date(project.updatedAt).toLocaleDateString()}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
