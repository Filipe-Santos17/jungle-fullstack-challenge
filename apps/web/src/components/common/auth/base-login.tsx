import type { FormEvent, PropsWithChildren } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface iBaseLoginTemplate extends PropsWithChildren {
    handleSubmitForm: (e: FormEvent) => Promise<void>
}

export default function BaseLoginTemplate({
    handleSubmitForm,
    children
}: iBaseLoginTemplate) {
    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-4xl">
                <div className="flex flex-col gap-6">
                    <Card className="overflow-hidden p-0">
                        <CardContent className="grid p-0 md:grid-cols-2">
                            <form className="p-6 md:p-8" onSubmit={handleSubmitForm}>
                                {children}
                            </form>
                            <div className="bg-muted relative hidden md:block">
                                <img
                                    src="https://www.sweetprocess.com/wp-content/uploads/2022/10/task-management-30-1.png"
                                    alt="Image"
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
