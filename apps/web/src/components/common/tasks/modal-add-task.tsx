import { useState, type FormEvent } from "react"
import { isAxiosError } from "axios"

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
import { CirclePlus } from "lucide-react"

import { tasksApi } from "@/lib/api"
import { showToastError, showToastSuccess } from '@/utils/toast';

import type { iMsgError } from "@/types/api"


export default function ModalAddTask() {
    const [formNewTask, setFormNewTask] = useState({
        title: '',
        description: '',
        deadline: '',
        priority: '',
        status: '',
    })

    const [showDialog, setShowDialog] = useState(false)

    function openDialog() {
        setShowDialog(true)
    }

    function handleChangeValue(key: keyof typeof formNewTask, newValue: string) {
        setFormNewTask(oldTask => {
            return {
                ...oldTask,
                [key]: newValue
            }
        })
    }

    async function handleSubmitFormNewTask(e: FormEvent) {
        try {
            e.preventDefault()

            const dataNewTask = {
                titulo: formNewTask.title,
                descricao: formNewTask.description,
                prazo: formNewTask.deadline,
                prioridade: formNewTask.priority.toLocaleLowerCase(),
                status: formNewTask.status.toLocaleLowerCase(),
            }

            const resp = await tasksApi.post("", dataNewTask)

            if (resp.status === 201) {
                showToastSuccess("Task criada com sucesso!", "")

                setShowDialog(false)

                setFormNewTask({
                    title: '',
                    description: '',
                    deadline: '',
                    priority: '',
                    status: '',
                })
            }
        } catch (error) {
            if (isAxiosError(error)) {
                const msgBackend = error.response?.data as iMsgError

                if (typeof (msgBackend?.message) === 'string') {
                    showToastError("Erro ao criar tasks!", msgBackend.message)
                }

                if (Array.isArray(msgBackend?.message)) {
                    showToastError("Erro ao criar tasks!", msgBackend.message[0])
                }
            }
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
                <form onSubmit={handleSubmitFormNewTask}>
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
                                name="title"
                                required
                                placeholder="Ex: Ajustar layout do dashboard"
                                value={formNewTask.title}
                                onChange={(e) => handleChangeValue('title', e.currentTarget.value)}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Descrição</Label>
                            <Textarea
                                id="description"
                                name="description"
                                required
                                placeholder="Descreva os detalhes da task"
                                className="resize-none"
                                value={formNewTask.description}
                                onChange={(e) => handleChangeValue('description', e.currentTarget.value)}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="deadline">Prazo</Label>
                            <Input
                                id="deadline"
                                name="deadline"
                                required
                                type="date"
                                value={formNewTask.deadline}
                                onChange={(e) => handleChangeValue('deadline', e.currentTarget.value)}
                            />
                        </div>

                        <div className="grid gap-2 w-full">
                            <Label htmlFor="priority">Prioridade</Label>
                            <Select
                                name="priority"
                                value={formNewTask.priority}
                                onValueChange={(newValue) => handleChangeValue('priority', newValue)}
                                required
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
                        </div>

                        <div className="grid gap-2 w-full">
                            <Label htmlFor="status">Status</Label>
                            <Select
                                name="status"
                                value={formNewTask.status}
                                onValueChange={(newValue) => handleChangeValue('status', newValue)}
                                required
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
                        </div>
                    </div>

                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button variant="outline" className="cursor-pointer">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit" className="cursor-pointer">Salvar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
