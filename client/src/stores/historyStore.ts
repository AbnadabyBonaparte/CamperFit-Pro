/**
 * Undo/Redo History Store
 * Mantém histórico de ações para undo/redo
 */

export type HistoryAction = 
  | { type: 'add_component'; componentId: string; component: any }
  | { type: 'remove_component'; componentId: string; component: any }
  | { type: 'update_component'; componentId: string; oldValue: any; newValue: any }
  | { type: 'move_component'; componentId: string; oldPosition: any; newPosition: any }
  | { type: 'rotate_component'; componentId: string; oldRotation: any; newRotation: any }
  | { type: 'batch'; actions: HistoryAction[] };

export interface HistoryState {
  past: HistoryAction[];
  present: any; // Estado atual
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
  push(action: HistoryAction, presentState: any) {
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

