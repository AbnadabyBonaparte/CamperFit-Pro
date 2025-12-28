import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Skeleton } from '../components/ui/Skeleton';
import { Alert } from '../components/ui/Alert';
import { Button } from '../components/ui/Button';

export function Reports() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--bg)' }}>
      <Card>
        <CardHeader>
          <CardTitle>Relatórios</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="space-y-4">
              <Skeleton className="h-4 w-56" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          )}

          {error && (
            <Alert variant="error" className="flex items-center justify-between">
              <span>Não foi possível carregar os relatórios.</span>
              <Button size="sm" variant="ghost" onClick={handleRetry}>
                Tentar de novo
              </Button>
            </Alert>
          )}

          {!isLoading && !error && (
            <Card className="border-dashed" style={{ backgroundColor: 'var(--surface)' }}>
              <CardContent className="py-8 text-center space-y-2">
                <div style={{ color: 'var(--text-primary)' }}>
                  Nenhum relatório disponível.
                </div>
                <div style={{ color: 'var(--text-secondary)' }}>
                  Os relatórios dinâmicos estarão aqui em breve.
                </div>
                <Button size="sm">Em desenvolvimento</Button>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
