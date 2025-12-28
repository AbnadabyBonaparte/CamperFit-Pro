/**
 * Undo/Redo History Store
 * Mantém histórico de ações para undo/redo
 */

type Vector3Snapshot = { x: number; y: number; z: number };
type ComponentSnapshot = {
  id: string;
  componentLibraryId?: string;
  position?: Vector3Snapshot;
  rotation?: Vector3Snapshot;
  dimensions?: { length: number; width: number; height: number };
  weight?: number;
  material?: string;
  color?: string;
  selected?: boolean;
};

export type HistoryAction =
  | { type: 'add_component'; componentId: string; component: ComponentSnapshot }
  | { type: 'remove_component'; componentId: string; component: ComponentSnapshot }
  | { type: 'update_component'; componentId: string; oldValue: ComponentSnapshot; newValue: ComponentSnapshot }
  | { type: 'move_component'; componentId: string; oldPosition: Vector3Snapshot; newPosition: Vector3Snapshot }
  | { type: 'rotate_component'; componentId: string; oldRotation: Vector3Snapshot; newRotation: Vector3Snapshot }
  | { type: 'batch'; actions: HistoryAction[] };

export interface HistoryState {
  past: HistoryAction[];
  present: ComponentSnapshot[] | null; // Estado atual
  future: HistoryAction[];
  maxHistorySize: number;
}

class HistoryStore {
  private state: HistoryState = {
    past: [],
    present: null,
    future: [],
    maxHistorySize: 50,
  };

  /**
   * Adicionar ação ao histórico
   */
  push(action: HistoryAction, presentState: ComponentSnapshot[] | null) {
    // Limpar futuro quando uma nova ação é feita
    this.state.future = [];
    
    // Adicionar ação ao passado
    this.state.past.push(action);
    this.state.present = presentState;
    
    // Limitar tamanho do histórico
    if (this.state.past.length > this.state.maxHistorySize) {
      this.state.past.shift();
    }
  }

  /**
   * Undo: voltar uma ação
   */
  undo(): HistoryAction | null {
    if (this.state.past.length === 0) return null;
    
    const lastAction = this.state.past.pop()!;
    this.state.future.unshift(lastAction);
    
    return lastAction;
  }

  /**
   * Redo: refazer uma ação
   */
  redo(): HistoryAction | null {
    if (this.state.future.length === 0) return null;
    
    const action = this.state.future.shift()!;
    this.state.past.push(action);
    
    return action;
  }

  /**
   * Verificar se pode fazer undo
   */
  canUndo(): boolean {
    return this.state.past.length > 0;
  }

  /**
   * Verificar se pode fazer redo
   */
  canRedo(): boolean {
    return this.state.future.length > 0;
  }

  /**
   * Limpar histórico
   */
  clear() {
    this.state.past = [];
    this.state.future = [];
    this.state.present = null;
  }

  /**
   * Obter estado atual
   */
  getState(): HistoryState {
    return { ...this.state };
  }
}

// Singleton instance
export const historyStore = new HistoryStore();

