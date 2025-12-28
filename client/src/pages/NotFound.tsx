import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg)' }}>
      <Card>
        <CardContent className="text-center py-12 px-8">
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            404
          </h1>
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
            Página não encontrada
          </p>
          <Link to="/dashboard">
            <Button>Voltar ao Dashboard</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
