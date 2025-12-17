import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

export enum TASK_PRIORITY {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
    URGENT = 'URGENT'
}

export enum TASK_STATUS {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    REVIEW = 'REVIEW',
    DONE = 'DONE'
}

@Entity({ name: "tasks" })
export class EntityTasks {
    @ApiProperty()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty()
    @Column("varchar", { nullable: false })
    titulo: string;

    @ApiProperty()
    @Column("varchar", { nullable: false })
    descricao: string;

    @ApiProperty()
    @Column("timestamptz", { nullable: false })
    prazo: string;

    @ApiProperty()
    @Column("enum", { enum: TASK_PRIORITY, default: TASK_PRIORITY.MEDIUM })
    prioridade: string;

    @ApiProperty()
    @Column("enum", { enum: TASK_STATUS, default: TASK_STATUS.TODO })
    status: string;

    @ApiProperty()
    @Column("uuid")
    user_id: string;

    @ApiProperty()
    @Column("timestamptz", { nullable: false })
    created_at: string;

    @ApiProperty()
    @Column("timestamptz", { nullable: false })
    updated_at: string;
}