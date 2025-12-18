import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import type { iComment } from "@/types/tasks"

import ImgUser from "@/imgs/user.png"

interface iCommentMsg {
    comment: iComment
}

export default function CommentMsgBox({ comment }: iCommentMsg) {
    return (
        <div key={comment.id} className="flex gap-3 py-3">
            <Avatar className="h-8 w-8 shrink-0">
                <AvatarImage src={ImgUser} alt="Profile photo" className="rounded-md " />
                <AvatarFallback>
                    User
                </AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
                <span className="text-sm font-medium">
                    User
                </span>

                <p className="text-sm text-muted-foreground">
                    {comment.comment_text}
                </p>
            </div>
        </div>
    )
}
