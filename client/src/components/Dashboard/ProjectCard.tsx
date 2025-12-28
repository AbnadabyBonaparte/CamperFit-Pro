import { Link } from 'react-router-dom';

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
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm(`Tem certeza que deseja deletar "${project.name}"?`)) {
      onDelete(project.id);
    }
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDuplicate(project.id);
  };

  const statusColor = {
    draft: 'bg-gray-100 text-gray-800',
    in_progress: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    archived: 'bg-gray-100 text-gray-600',
  }[project.status || 'draft'];

  return (
    <Link
      to={`/editor/${project.id}`}
      className="block bg-white border border-gray-300 rounded-lg p-4 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {project.name}
          </h3>
          {project.description && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {project.description}
            </p>
          )}
        </div>
        <span className={`px-2 py-1 rounded text-xs font-medium ${statusColor}`}>
          {project.status === 'draft' && '📝 Rascunho'}
          {project.status === 'in_progress' && '⚙️ Em Progresso'}
          {project.status === 'completed' && '✅ Completo'}
          {project.status === 'archived' && '📦 Arquivado'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-3 text-sm text-gray-600">
        <div>
          <span className="font-medium">Tipo:</span>{' '}
          {project.vehicleType || 'Custom'}
        </div>
        {project.totalWeight && (
          <div>
            <span className="font-medium">Peso:</span>{' '}
            {project.totalWeight.toFixed(1)} kg
          </div>
        )}
        {project.length && project.width && (
          <div>
            <span className="font-medium">Dimensões:</span>{' '}
            {project.length.toFixed(0)} × {project.width.toFixed(0)} mm
          </div>
        )}
        {project.cgX && (
          <div>
            <span className="font-medium">CG:</span>{' '}
            {project.cgX.toFixed(0)}, {project.cgY.toFixed(0)}, {project.cgZ.toFixed(0)} mm
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-200">
        <div>
          Criado: {new Date(project.createdAt).toLocaleDateString('pt-BR')}
          {project.updatedAt && (
            <> • Atualizado: {new Date(project.updatedAt).toLocaleDateString('pt-BR')}</>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleDuplicate}
            className="px-2 py-1 text-blue-600 hover:bg-blue-50 rounded"
            title="Duplicar"
          >
            📋
          </button>
          <button
            onClick={handleDelete}
            className="px-2 py-1 text-red-600 hover:bg-red-50 rounded"
            title="Deletar"
          >
            🗑️
          </button>
        </div>
      </div>
    </Link>
  );
}

