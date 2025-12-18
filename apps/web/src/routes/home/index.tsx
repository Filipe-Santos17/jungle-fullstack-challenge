import { useState } from 'react';
import { createFileRoute, redirect } from '@tanstack/react-router'

import Header from '@/components/common/header';
import DataTableTasks from '@/components/common/tasks/table-tasks';

import { useNotifications } from '@/hooks/useNotifications';
import useGetTasks from '@/hooks/query-tasks/useGetTasks';

import { useAuthStore } from '@/stores/auth.store';

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
  const [page, setPage] = useState(1);

  const { user } = useAuthStore();
  const { data: tasks = [], isLoading, isError } = useGetTasks({ page, size: 10 });
  //const { mutateAsync: updateTask } = useUpdateTask()

  useNotifications(user?.id ?? null);

  async function getNewTasksByParams(newPage: number) {
    setPage(newPage);
  }

  if (isError) return <p>Erro ao carregar tasks.</p>;

  return (
    <>
      <Header />
      <DataTableTasks
        data={tasks}
        handleChangePage={getNewTasksByParams}
        isLoading={isLoading}
        totalPages={50}
      />
    </>
  );
}
