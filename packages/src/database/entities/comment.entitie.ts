import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({ name: "comments" })
export class EntityComments {
    @ApiProperty()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty()
    @Column("varchar")
    user_id: string;

    @ApiProperty()
    @Column("varchar")
    task_id: string;

    @ApiProperty()
    @Column("text")
    comment_text: string;

    @ApiProperty()
    @Column("timestamptz", { nullable: false, default: () => 'now()' })
    created_at: string;

    @ApiProperty()
    @Column("timestamptz", { nullable: false, default: () => 'now()' })
    updated_at: string;
}