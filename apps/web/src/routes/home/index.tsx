import { useState, useEffect } from 'react';
import { createFileRoute, redirect } from '@tanstack/react-router'

import Header from '@/components/common/header';
import KanbanTasks from '@/components/common/tasks/kanban-tasks';

import { useNotifications } from '@/hooks/useNotifications';
import { useTasks } from '@/hooks/useTasks';

import { useAuthStore } from '@/stores/auth.store';

import mapTasksToKanbanItems from '@/utils/convert-task-kanban-item'

import type { iKanbanItemProp } from '@/types/tasks';

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
  const { data: tasks, isLoading, isError } = useTasks();

  useNotifications(user?.id ?? null);

  const [allTasks, setAllTasks] = useState<iKanbanItemProp[]>(() =>
    mapTasksToKanbanItems(tasks ?? [])
  );

  useEffect(() => {
    if (tasks) {
      setAllTasks(mapTasksToKanbanItems(tasks));
    }
  }, [tasks]);
  
  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao carregar tasks.</p>;
  
  return (
    <>
      <Header />
      <KanbanTasks
        features={allTasks}
        setFeatures={setAllTasks}
      />
    </>
  );
}
