import type { Dispatch, SetStateAction } from "react";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { dateFormatter } from "@/utils/date-formatters"

import type { iKanbanItemProp } from "@/types/tasks";
import { DialogClose, DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

interface iModalGetOneTask {
    selectedFeature: iKanbanItemProp | null;
    setSelectedFeature: Dispatch<SetStateAction<iKanbanItemProp | null>>;
}

export default function ModalGetOneTask({ selectedFeature, setSelectedFeature }: iModalGetOneTask) {
    return (
        <Dialog
            open={selectedFeature}
            onOpenChange={(open) => !open && setSelectedFeature(null)}
        >
           <DialogContent className="">
                <form onSubmit={() => null}>
                    <DialogHeader>
                        <DialogTitle>Criar / Editar Task</DialogTitle>
                        <DialogDescription className="mb-4">
                            Preencha as informações da task. Clique em salvar ao finalizar.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4">
                        <div className="grid gap-2">
                          
                        </div>

                        <div className="grid gap-2">
                           
                        </div>

                        <div className="grid gap-2">
                           
                        </div>

                        <div className="grid gap-2 w-full">
                          
                        </div>

                        <div className="grid gap-2 w-full">
                            
                        </div>
                    </div>

                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button variant="outline" className="cursor-pointer">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit" className="cursor-pointer">
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
