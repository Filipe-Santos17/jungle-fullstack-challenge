import { useState, use } from 'react';
import { createFileRoute } from '@tanstack/react-router'
import { isAxiosError } from 'axios';

import Header from '@/components/common/header';
import KanbanTasks from '@/components/common/tasks/kanban-tasks';

import { tasksApi } from '@/lib/api'

import { showToastError } from '@/utils/toast';

import type { iMsgError } from '@/types/api';

export const Route = createFileRoute('/home/')({
    component: RouteComponent,
})

const fetchDataTasks = async () => {
    try {
        const response = await tasksApi.get('')

        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            const msgBackend = error.response?.data as iMsgError

            if (typeof (msgBackend?.message) === 'string') {
                showToastError("Erro ao carregar tasks!", msgBackend.message)
            }
        }

        console.error(error)
    }
};

const dataPromise = fetchDataTasks();

function RouteComponent() {
    const allTasks = use(dataPromise);

    const [features, setFeatures] = useState(allTasks);

    return (
        <>
            <Header />
            <KanbanTasks
                features={[]}
                setFeatures={setFeatures}
            />
        </>
    );
};