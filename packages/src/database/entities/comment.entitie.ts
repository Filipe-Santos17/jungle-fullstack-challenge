import { Entity, PrimaryGeneratedColumn, Column, ForeignKey } from "typeorm"

@Entity({ name: "comments" })
export class EntityComments {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("varchar")
    user_id: string;

    @Column("varchar")
    task_id: string;

    @Column("text")
    comment_text: string;

    @Column("timestamptz", { nullable: false, default: () => 'now()' })
    created_at: string;

    @Column("timestamptz", { nullable: false, default: () => 'now()' })
    updated_at: string;
}