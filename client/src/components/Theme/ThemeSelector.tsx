import { useUIStore } from '../../stores/uiStore';
import { themes, ThemeName } from '../../constants/themes';
import { Button } from '../ui/Button';

export function ThemeSelector() {
  const { theme, setTheme } = useUIStore();

  return (
    <div className="p-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
        Tema
      </label>
      <div className="grid grid-cols-2 gap-2">
        {(Object.keys(themes) as ThemeName[]).map((themeName) => (
          <Button
            key={themeName}
            variant={theme === themeName ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setTheme(themeName)}
            className="text-sm"
          >
            {themes[themeName].displayName}
          </Button>
        ))}
      </div>
    </div>
  );
}
