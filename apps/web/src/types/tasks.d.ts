import type React from 'react';

export enum TASK_PRIORITY {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
    URGENT = 'urgent'
}

export enum TASK_STATUS {
    TODO = 'todo',
    IN_PROGRESS = 'in_progress',
    REVIEW = 'review',
    DONE = 'done'
}

// Interface correspondente
export interface iTasksCreate {
    titulo: string;
    descricao: string;
    prazo: string;
    prioridade: TASK_PRIORITY;
    status: TASK_STATUS;
}

export interface iTasks extends iTasksCreate {
    id: string;
    user_id: string;
    created_at: string;
    updated_at: string;
}

interface iKanbanItemProp extends iTasks {
    name: string;
    column: TASK_STATUS;
    startAt: Date;
    endAt: Date;
    owner: string;
}

export interface iFeaturesDataKanban {
    features: iKanbanItemProp[];
    setFeatures: (features: iKanbanItemProp[]) => Promise<void>;
}