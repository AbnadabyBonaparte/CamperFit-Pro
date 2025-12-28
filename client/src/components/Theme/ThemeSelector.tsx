import { useUIStore } from '../../stores/uiStore';
import { themes, ThemeName } from '../../constants/themes';

export function ThemeSelector() {
  const { theme, setTheme } = useUIStore();

  return (
    <div className="p-4 border-b border-gray-200">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Tema
      </label>
      <div className="grid grid-cols-2 gap-2">
        {(Object.keys(themes) as ThemeName[]).map((themeName) => (
          <button
            key={themeName}
            onClick={() => setTheme(themeName)}
            className={`px-3 py-2 rounded text-sm border-2 transition-all ${
              theme === themeName
                ? 'border-blue-600 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300 bg-white text-gray-700'
            }`}
          >
            {themes[themeName].displayName}
          </button>
        ))}
      </div>
    </div>
  );
}

