import { Entity, PrimaryGeneratedColumn, Column, ForeignKey } from "typeorm"

@Entity({ name: "comments" })
export class EntityComment {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ForeignKey("uuid", { onDelete: "CASCADE" })
    user_id: string;

    @ForeignKey("uuid", { onDelete: "CASCADE" })
    task_id: string;

    @Column("text")
    comment_text: string;

    @Column("timestamptz", { nullable: false })
    created_at: string;

    @Column("timestamptz", { nullable: false })
    updated_at: string;
}