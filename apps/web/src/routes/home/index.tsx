import { useState, useEffect, useRef } from 'react';
import { createFileRoute, redirect } from '@tanstack/react-router'

import Header from '@/components/common/header';
import KanbanTasks from '@/components/common/tasks/kanban-tasks';

import { useNotifications } from '@/hooks/useNotifications';
import { useGetTasks } from '@/hooks/query-tasks/useGetTasks';

import { useAuthStore } from '@/stores/auth.store';

import mapTasksToKanbanItems from '@/utils/convert-task-kanban-item'

import type { iKanbanItemProp } from '@/types/tasks';
import { useUpdateTask } from '@/hooks/query-tasks/useUpdateTask';

export const Route = createFileRoute('/home/')({
  beforeLoad: ({ context }) => {
    //@ts-ignore
    if (!context?.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
      })
    }
  },
  component: RouteComponent,
})


function RouteComponent() {
  const { user } = useAuthStore();
  const { data: tasks, isLoading, isError } = useGetTasks();
  const { mutateAsync: updateTask } = useUpdateTask()

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useNotifications(user?.id ?? null);

  const [allTasks, setAllTasks] = useState<iKanbanItemProp[]>(() =>
    mapTasksToKanbanItems(tasks ?? [])
  );

  async function updateTasksHandleMove(dataKanban: iKanbanItemProp[]) {
    setAllTasks(dataKanban)
    
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    //PS: Evita que qualquer mudança de posição provoque um disparo / atualização
    debounceTimerRef.current = setTimeout(async () => {
      const changedTask = dataKanban[dataKanban.length - 1];

      if (!changedTask) return;

      changedTask.status = changedTask.column

      await updateTask({ id: changedTask.id, data: changedTask })
    }, 1000);
  }

  useEffect(() => {
    if (tasks) {
      const mapped = mapTasksToKanbanItems(tasks);
      setAllTasks(mapped);
    }
  }, [tasks]);


  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao carregar tasks.</p>;

  return (
    <>
      <Header />
      <KanbanTasks
        features={allTasks}
        setFeatures={updateTasksHandleMove}
      />
    </>
  );
}
