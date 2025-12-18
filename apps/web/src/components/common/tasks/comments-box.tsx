import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button";
import CommentMsgBox from "./comment-msg-box";

import { commentSchema, type tCommentSchema } from "@/validators/task.validator";

import useGetComments from "@/hooks/query-tasks/useGetComment";
import usePostComment from "@/hooks/query-tasks/usePostComment";

interface iCommentsBox {
    id: string
}

export default function CommentsBox({ id }: iCommentsBox) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<tCommentSchema>({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            comment: '',
        },
    })

    const { mutateAsync: postComment, isPending } = usePostComment()
    const { data: commentsData, isLoading } = useGetComments({ id })

    useEffect(() => {
        if (!id) return
    }, [id])


    async function handleSubmitAddComment(data: tCommentSchema) {
        const req = await postComment({ id, comment: data.comment })

        if (req === "ok") {
            reset({
                comment: ''
            })
        }
    }

    return (
        <div className="max-h-91">
            <Label htmlFor="description" className="mb-2">Comentários</Label>
            <div className="border border-[#EAEAEA] w-full p-4 rounded-md flex flex-col h-full">
                <div className="flex-1 overflow-y-auto">
                    {isLoading ?
                        <>
                            <div className="flex flex-col gap-6">
                                {Array.from({ length: 7 }).map((_, index) => (
                                    <div
                                        className="h-4 w-full animate-pulse rounded-md bg-muted"
                                        key={index}
                                    />
                                ))}
                            </div>
                        </> :
                        <>
                            {commentsData?.map(comment => (
                                <CommentMsgBox comment={comment} />
                            ))}
                        </>
                    }
                </div>
                <div className="flex w-full items-center gap-2 mt-4">
                    <div className="w-full">
                        <Input
                            id="title"
                            className="mt-auto w-full"
                            placeholder="Ex: Ajustar layout do dashboard"
                            {...register('comment')}
                        />
                        {errors.comment && (
                            <p className="text-sm text-destructive">
                                {errors.comment.message}
                            </p>
                        )}
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleSubmit(handleSubmitAddComment)}
                        disabled={isPending}
                    >
                        {isPending ? <Spinner /> : "Comentar"}
                    </Button>
                </div>
            </div>
        </div>
    )
}
