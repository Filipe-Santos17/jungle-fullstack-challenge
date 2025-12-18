import { useState, type FormEvent } from "react"
import { CirclePlus } from "lucide-react"

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
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ModalAddTask() {
    const [filterTask, setFilterTask] = useState({
        myTasks: false,
        title: '',
        deadline: '',
        priority: '',
        status: '',
    })

    const [showDialog, setShowDialog] = useState(false)

    function openDialog() {
        setShowDialog(true)
    }

    function handleChangeValue(key: keyof typeof filterTask, newValue: string | boolean) {
        setFilterTask(oldTask => {
            return {
                ...oldTask,
                [key]: newValue
            }
        })
    }

    async function handleSubmitFormNewTask(e: FormEvent) {
        e.preventDefault()

        const dataNewTask = {
            myTasks: filterTask.myTasks,
            title: filterTask.title,
            deadline: filterTask.deadline,
            priority: filterTask.priority,
            status: filterTask.status,
        }
    }

    return (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer hover:opacity-75" onClick={openDialog}>
                    <CirclePlus />
                    Aplicar filtros
                </Button>
            </DialogTrigger>
            <DialogContent className="">
                <form onSubmit={handleSubmitFormNewTask}>
                    <DialogHeader>
                        <DialogTitle>Filtrar Tasks</DialogTitle>
                        <DialogDescription className="mb-4">
                            Preencha os critérios para seleção da task.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4">
                        <div className="flex items-center gap-3">
                            <Checkbox
                                id="my-tasks"
                                checked={filterTask.myTasks}
                                onCheckedChange={(checked) =>
                                    handleChangeValue('myTasks', Boolean(checked))
                                }
                            />
                            <Label htmlFor="my-tasks">Filtrar apenas as tasks que criei</Label>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="title">Título</Label>
                            <Input
                                id="title"
                                name="title"
                                required
                                placeholder="Ex: Ajustar layout do dashboard"
                                value={filterTask.title}
                                onChange={(e) => handleChangeValue('title', e.currentTarget.value)}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="deadline">Prazo</Label>
                            <Input
                                id="deadline"
                                name="deadline"
                                required
                                type="date"
                                value={filterTask.deadline}
                                onChange={(e) => handleChangeValue('deadline', e.currentTarget.value)}
                            />
                        </div>

                        <div className="grid gap-2 w-full">
                            <Label htmlFor="priority">Prioridade</Label>
                            <Select
                                name="priority"
                                value={filterTask.priority}
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
                                value={filterTask.status}
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
                        <Button type="submit" className="cursor-pointer">Filtrar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
