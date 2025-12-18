import type { iTasks, iKanbanItemProp } from '@/types/tasks';

export default function mapTasksToKanbanItems(tasks: iTasks[]): iKanbanItemProp[] {
    return tasks.map(task => ({
        name: task.titulo,        // titulo vira nome do card
        column: task.status,      // status da task vira coluna
        startAt: new Date(task.created_at),
        endAt: new Date(task.prazo),
        owner: task.user_id,
        ...task,
    }));
}
