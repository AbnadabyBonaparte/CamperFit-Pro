import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

export function Reports() {
  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--bg)' }}>
      <Card>
        <CardHeader>
          <CardTitle>Relatórios</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ color: 'var(--text-secondary)' }}>
            Funcionalidade de relatórios em desenvolvimento.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
