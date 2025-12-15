import { Entity, PrimaryGeneratedColumn, Column, ForeignKey } from "typeorm"

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
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("varchar", { nullable: false })
    titulo: string;

    @Column("varchar", { nullable: false })
    descricao: string;

    @Column("timestamptz", { nullable: false })
    prazo: string;

    @Column("enum", { enum: TASK_PRIORITY, default: TASK_PRIORITY.MEDIUM })
    prioridade: string;

    @Column("enum", { enum: TASK_STATUS, default: TASK_STATUS.TODO })
    status: string;

    @Column("uuid")
    user_id: string;

    @Column("timestamptz", { nullable: false })
    created_at: string;

    @Column("timestamptz", { nullable: false })
    updated_at: string;
}