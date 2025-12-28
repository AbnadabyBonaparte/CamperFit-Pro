import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

export function Marketplace() {
  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--bg)' }}>
      <Card>
        <CardHeader>
          <CardTitle>Marketplace</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ color: 'var(--text-secondary)' }}>
            Marketplace em desenvolvimento.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
