import { useState } from "react"
import { useNavigate } from "@tanstack/react-router"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Spinner } from "@/components/ui/spinner"
import { LogOut } from "lucide-react"

import { authApi } from "@/lib/api"

export default function ModalLogout() {
    const [showDialog, setShowDialog] = useState(false)
    const [isPending, setIsPending] = useState(false)

    const navigate = useNavigate()

    function openDialog() {
        setShowDialog(true)
    }

    async function handleSubmitLogout() {
        setIsPending(true)

        const req = await authApi.post('/logout')

        if (req.status === 200) {
            navigate({ to: "/login", replace: true })
        }
    }

    return (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer hover:opacity-75" onClick={openDialog}>
                    <LogOut />
                    Logout
                </Button>
            </DialogTrigger>
            <DialogContent className="">
                <form onSubmit={handleSubmitLogout}>
                    <DialogHeader>
                        <DialogTitle>Sair da conta</DialogTitle>
                    </DialogHeader>

                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button variant="outline" className="cursor-pointer  hover:opacity-75">
                                Cancelar
                            </Button>
                        </DialogClose>
                        <Button type="submit" className="cursor-pointer bg-red-600 hover:opacity-75" disabled={isPending}>
                            {isPending ? <Spinner /> : "Sair"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}