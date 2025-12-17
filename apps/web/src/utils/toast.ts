import { toast } from "sonner"

export function showToastError(title: string, msg: string) {
    toast.error(title, {
        description: msg,
        classNames: {
            description: "!text-red-500",
        },
    })
}

export function showToastSuccess(title: string, msg: string) {
    toast.success(title, {
        description: msg,
        classNames: {
            description: "!text-green-500",
        },
    })
}