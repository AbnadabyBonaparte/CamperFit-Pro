import { useState } from 'react';
import { useProjects, useCreateProject, useDeleteProject, useDuplicateProject } from '../hooks/useProject';
import { ProjectCard } from '../components/Dashboard/ProjectCard';
import { NewProjectDialog } from '../components/Dashboard/NewProjectDialog';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);
  const { data: projects, isLoading, error } = useProjects();
  const createProject = useCreateProject();
  const deleteProject = useDeleteProject();
  const duplicateProject = useDuplicateProject();
  const navigate = useNavigate();

  const handleCreateProject = async (data: any) => {
    try {
      const result = await createProject.mutateAsync(data);
      if (result?.id) {
        navigate(`/editor/${result.id}`);
      }
    } catch (err) {
      console.error('Error creating project:', err);
      alert('Erro ao criar projeto. Tente novamente.');
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await deleteProject.mutateAsync(id);
    } catch (err) {
      console.error('Error deleting project:', err);
      alert('Erro ao deletar projeto. Tente novamente.');
    }
  };

  const handleDuplicateProject = async (id: string) => {
    try {
      const result = await duplicateProject.mutateAsync({ id });
      if (result?.id) {
        // Optionally navigate to the duplicated project
        // navigate(`/editor/${result.id}`);
      }
    } catch (err) {
      console.error('Error duplicating project:', err);
      alert('Erro ao duplicar projeto. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">CamperFit Pro</h1>
            <nav className="flex gap-4">
              <a href="/marketplace" className="text-gray-600 hover:text-gray-900">
                Marketplace
              </a>
              <button className="text-gray-600 hover:text-gray-900">👤</button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Meus Projetos</h2>
              <p className="text-gray-600 mt-1">
                Gerencie seus projetos de motorhomes
              </p>
            </div>
            <button
              onClick={() => setShowNewProjectDialog(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
            >
              + Novo Projeto
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-2xl font-bold text-gray-900">
                {projects?.length || 0}
              </div>
              <div className="text-sm text-gray-600">Projetos</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-2xl font-bold text-gray-900">
                {projects?.filter((p: any) => p.status === 'completed').length || 0}
              </div>
              <div className="text-sm text-gray-600">Completos</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-2xl font-bold text-gray-900">
                {projects?.filter((p: any) => p.status === 'in_progress').length || 0}
              </div>
              <div className="text-sm text-gray-600">Em Progresso</div>
            </div>
          </div>
        </div>

        {/* Projects List */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="text-gray-600">Carregando projetos...</div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
            Erro ao carregar projetos. Tente novamente.
          </div>
        )}

        {!isLoading && !error && (
          <>
            {!projects || projects.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <div className="text-gray-600 mb-4">
                  Você ainda não tem projetos criados.
                </div>
                <button
                  onClick={() => setShowNewProjectDialog(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Criar Primeiro Projeto
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project: any) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onDelete={handleDeleteProject}
                    onDuplicate={handleDuplicateProject}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Templates Section */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Templates Sugeridos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
              <div className="text-3xl mb-2">🚐</div>
              <div className="font-semibold mb-2">Sprinter 313 Padrão</div>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm">
                Usar Template
              </button>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
              <div className="text-3xl mb-2">🚐</div>
              <div className="font-semibold mb-2">Kombi Padrão</div>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm">
                Usar Template
              </button>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
              <div className="text-3xl mb-2">🚐</div>
              <div className="font-semibold mb-2">Furgão Padrão</div>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm">
                Usar Template
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* New Project Dialog */}
      <NewProjectDialog
        isOpen={showNewProjectDialog}
        onClose={() => setShowNewProjectDialog(false)}
        onCreate={handleCreateProject}
      />
    </div>
  );
}
