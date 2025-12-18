import { useState } from "react"
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import usePostTask from "@/hooks/query-tasks/usePostTask"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
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
import { CirclePlus } from "lucide-react"

import type { TASK_PRIORITY, TASK_STATUS } from "@/types/tasks"

import { taskCreateSchema } from "@/validators/task.validator"
import type { tTaskCreateSchema } from "@/validators/task.validator"


export default function ModalAddTask() {
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

    const { mutateAsync: postTask, isPending } = usePostTask();

    const [showDialog, setShowDialog] = useState(false)

    function openDialog() {
        setShowDialog(true)
    }

    async function handleSubmitFormNewTask(data: tTaskCreateSchema) {
        const dataNewTask = {
            ...data,
            prioridade: data.prioridade.toLocaleLowerCase() as TASK_PRIORITY,
            status: data.status.toLocaleLowerCase() as TASK_STATUS,
        }

        const resp = await postTask(dataNewTask);

        if (resp === "ok") {
            setShowDialog(false)
            reset()
        }
    }

    return (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer hover:opacity-75" onClick={openDialog}>
                    <CirclePlus />
                    Criar nova task
                </Button>
            </DialogTrigger>
            <DialogContent className="">
                <form onSubmit={handleSubmit(handleSubmitFormNewTask)}>
                    <DialogHeader>
                        <DialogTitle>Criar / Editar Task</DialogTitle>
                        <DialogDescription className="mb-4">
                            Preencha as informações da task. Clique em salvar ao finalizar.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4">
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

                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button variant="outline" className="cursor-pointer">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit" className="cursor-pointer" disabled={isPending}>
                            {isPending ? <Spinner /> : "Salvar"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
