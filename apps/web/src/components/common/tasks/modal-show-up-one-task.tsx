import { useEffect, type Dispatch, type SetStateAction } from "react";
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import useUpdateTask from "@/hooks/query-tasks/useUpdateTask";
import useDeleteTask from "@/hooks/query-tasks/useDeleteTask";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { DialogClose, DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

import CommentsBox from "./comments-box";

import type { iTasks } from "@/types/tasks";
import { taskCreateSchema, type tTaskCreateSchema } from "@/validators/task.validator";

interface iModalGetOneTask {
    selectedTask: iTasks | null;
    setSelectedTask: Dispatch<SetStateAction<iTasks | null>>;
}

export default function ModalShowUpTask({ selectedTask, setSelectedTask }: iModalGetOneTask) {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<tTaskCreateSchema>({
        resolver: zodResolver(taskCreateSchema),
        defaultValues: {
            titulo: '',
            descricao: '',
            prazo: '',
            prioridade: undefined,
            status: undefined,
        },
    })

    useEffect(() => {
        if (!selectedTask) return

        reset({
            titulo: selectedTask.titulo,
            descricao: selectedTask.descricao,
            prazo: selectedTask.prazo?.slice(0, 10),
            prioridade: selectedTask.prioridade.toUpperCase() as any,
            status: selectedTask.status.toUpperCase() as any,
        })
    }, [selectedTask, reset])

    const { mutateAsync: updateTask, isPending: isPendingUpdate } = useUpdateTask();
    const { mutateAsync: deleteTask, isPending: isPendingDelete } = useDeleteTask();

    async function handleSubmitFormUpdateTask(data: tTaskCreateSchema) {
        const taskUpdated = {
            ...data,
            prioridade: data.prioridade.toLocaleLowerCase(),
            status: data.status.toLocaleLowerCase(),
        } as iTasks

        updateTask({ data: taskUpdated, id: selectedTask?.id! })
    }

    async function handleSubmitFormDeleteTask() {
        const resp = deleteTask(selectedTask?.id!)

        if (typeof resp === 'string') {
            setSelectedTask(null)
        }
    }

    return (
        <Dialog
            open={Boolean(selectedTask)}
            onOpenChange={(open) => !open && setSelectedTask(null)}
        >
            <DialogContent className="max-w-[70vw]! w-full max-h-[70vh]! flex-1 overflow-hidden">
                <form onSubmit={handleSubmit(handleSubmitFormUpdateTask)} className="">
                    <DialogHeader>
                        <DialogTitle>Editar / Deletar Task</DialogTitle>
                        <DialogDescription className="mb-4">
                            Preencha as informações da task. Clique em salvar ao finalizar.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Título</Label>
                                <Input
                                    id="title"
                                    placeholder="Ex: Ajustar layout do dashboard"
                                    {...register('titulo')}
                                />
                                {errors.titulo && (
                                    <p className="text-sm text-destructive">
                                        {errors.titulo.message}
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Descrição</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Descreva os detalhes da task"
                                    className="resize-none"
                                    {...register('descricao')}
                                />
                                {errors.descricao && (
                                    <p className="text-sm text-destructive">
                                        {errors.descricao.message}
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="deadline">Prazo</Label>
                                <Input
                                    id="deadline"
                                    type="date"
                                    {...register('prazo')}
                                />
                                {errors.prazo && (
                                    <p className="text-sm text-destructive">
                                        {errors.prazo.message}
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-2 w-full">
                                <Label htmlFor="priority">Prioridade</Label>
                                <Controller
                                    control={control}
                                    name="prioridade"
                                    render={({ field }) => (
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger id="priority" className="w-full">
                                                <SelectValue placeholder="Selecione a prioridade" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="LOW">LOW</SelectItem>
                                                <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                                                <SelectItem value="HIGH">HIGH</SelectItem>
                                                <SelectItem value="URGENT">URGENT</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.prioridade && (
                                    <p className="text-sm text-destructive">
                                        {errors.prioridade.message}
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-2 w-full">
                                <Label htmlFor="status">Status</Label>
                                <Controller
                                    control={control}
                                    name="status"
                                    render={({ field }) => (
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger id="status" className="w-full">
                                                <SelectValue placeholder="Selecione o status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="TODO">TODO</SelectItem>
                                                <SelectItem value="IN_PROGRESS">IN_PROGRESS</SelectItem>
                                                <SelectItem value="REVIEW">REVIEW</SelectItem>
                                                <SelectItem value="DONE">DONE</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.status && (
                                    <p className="text-sm text-destructive">
                                        {errors.status.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <CommentsBox
                            id={selectedTask?.id!}
                        />
                    </div>

                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button variant="outline" className="cursor-pointer">Cancelar</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button 
                                className="cursor-pointer bg-red-500" 
                                onClick={handleSubmitFormDeleteTask}
                            >
                                {isPendingDelete ? <Spinner /> : "Deletar"}
                            </Button>
                        </DialogClose>
                        <Button type="submit" className="cursor-pointer">
                            {isPendingUpdate ? <Spinner /> : "Atualizar"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}
