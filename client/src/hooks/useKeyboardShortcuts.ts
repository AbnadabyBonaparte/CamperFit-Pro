import { useEffect } from 'react';
import { useProjectStore } from '../stores/projectStore';

/**
 * Hook para atalhos de teclado (Undo/Redo, etc)
 */
export function useKeyboardShortcuts() {
  const { undo, redo, canUndo, canRedo } = useProjectStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+Z ou Cmd+Z (Mac) para Undo
      if ((event.ctrlKey || event.metaKey) && event.key === 'z' && !event.shiftKey) {
        event.preventDefault();
        if (canUndo()) {
          undo();
        }
      }

      // Ctrl+Shift+Z ou Cmd+Shift+Z (Mac) para Redo
      if ((event.ctrlKey || event.metaKey) && event.key === 'z' && event.shiftKey) {
        event.preventDefault();
        if (canRedo()) {
          redo();
        }
      }

      // Ctrl+Y para Redo (Windows/Linux)
      if ((event.ctrlKey || event.metaKey) && event.key === 'y') {
        event.preventDefault();
        if (canRedo()) {
          redo();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [undo, redo, canUndo, canRedo]);
}

