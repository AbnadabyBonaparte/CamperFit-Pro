import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useProjects, useCreateProject, useDeleteProject, useDuplicateProject } from '../hooks/useProject';
import { ProjectCard } from '../components/Dashboard/ProjectCard';
import { NewProjectDialog } from '../components/Dashboard/NewProjectDialog';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Alert } from '../components/ui/Alert';
import { Skeleton } from '../components/ui/Skeleton';
import { vehicles } from '../constants/vehicles';

export function Dashboard() {
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);
  const { data: projects, isLoading, error } = useProjects();
  const createProject = useCreateProject();
  const deleteProject = useDeleteProject();
  const duplicateProject = useDuplicateProject();
  const navigate = useNavigate();

  const handleCreateProject = async (data: { name: string; description?: string; vehicleId?: string }) => {
    try {
      const result = await createProject.mutateAsync(data);
      if (result?.id) {
        navigate(`/editor/${result.id}`);
      }
    } catch (err) {
      // Error is handled by tRPC error handling
      // Could add toast notification here if needed
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await deleteProject.mutateAsync(id);
    } catch (err) {
      // Error is handled by tRPC error handling
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
      // Error is handled by tRPC error handling
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Header */}
      <header className="border-b" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--color-border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              CamperFit Pro
            </h1>
            <nav className="flex gap-4 items-center">
              <a
                href="/marketplace"
                className="hover:opacity-80 transition-opacity"
                style={{ color: 'var(--text-secondary)' }}
              >
                Marketplace
              </a>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Sair
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Meus Projetos
              </h2>
              <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>
                Gerencie seus projetos de motorhomes
              </p>
            </div>
            <Button onClick={() => setShowNewProjectDialog(true)}>
              + Novo Projeto
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {projects?.length || 0}
                </div>
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Projetos
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {projects?.filter((p) => p.status === 'completed').length || 0}
                </div>
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Completos
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {projects?.filter((p) => p.status === 'in_progress').length || 0}
                </div>
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Em Progresso
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Projects List */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="flex flex-col gap-4 items-center">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-32 w-full max-w-md" />
              <Skeleton className="h-32 w-full max-w-md" />
            </div>
          </div>
        )}

        {error && (
          <Alert variant="error" className="mb-4">
            Erro ao carregar projetos. Tente novamente.
          </Alert>
        )}

        {!isLoading && !error && (
          <>
            {!projects || projects.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <div className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                    Você ainda não tem projetos criados.
                  </div>
                  <Button onClick={() => setShowNewProjectDialog(true)}>
                    Criar Primeiro Projeto
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
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

        {/* Vehicle Templates Section - Dynamic from vehicles.ts */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            Veículos Disponíveis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {vehicles.slice(0, 6).map((vehicle) => (
              <Card key={vehicle.id}>
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">🚐</div>
                  <div className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    {vehicle.name}
                  </div>
                  <div className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                    Payload: {vehicle.payloadMax} kg
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowNewProjectDialog(true);
                      // Vehicle will be selected in dialog
                    }}
                  >
                    Criar Projeto
                  </Button>
                </CardContent>
              </Card>
            ))}
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
