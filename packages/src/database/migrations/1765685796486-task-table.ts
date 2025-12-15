import { MigrationInterface, QueryRunner } from "typeorm";

export class TaskTable1765685796486 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TYPE task_priority AS ENUM (
                'low',
                'medium',
                'high',
                'urgent'
            );

            CREATE TYPE task_status AS ENUM (
                'todo',
                'in_progress',
                'review',
                'done'
            );

            CREATE TABLE tasks (
                id uuid DEFAULT gen_random_uuid(),
                titulo VARCHAR(255) NOT NULL,
                descricao TEXT,
                prazo TIMESTAMPTZ NOT NULL,
                prioridade task_priority NOT NULL DEFAULT 'medium',
                status task_status NOT NULL DEFAULT 'todo',
                user_id uuid NOT NULL,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

                CONSTRAINT tasks_key_id PRIMARY KEY (id),

                CONSTRAINT tasks_user_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query("DROP TABLE tasks;")
        queryRunner.query("DROP TYPE task_priority; DROP TYPE task_status;")
    }

}
