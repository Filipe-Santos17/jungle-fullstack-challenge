import type React from 'react';

export enum TASK_PRIORITY {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export enum TASK_STATUS {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  DONE = 'done'
}

// Interface correspondente
export interface iTasks {
  id: string;
  titulo: string;
  descricao: string;
  prazo: string;
  prioridade: TASK_PRIORITY;
  status: TASK_STATUS;
  user_id: string;
  created_at: string;
  updated_at: string;
}

interface iKanbanItemProp {
    id: string;
    name: string;
    column: string;
}

export interface iFeaturesDataKanban {
  features: iKanbanItemProp[];
  setFeatures: React.Dispatch<React.SetStateAction<iKanbanItemProp[]>>;
}
