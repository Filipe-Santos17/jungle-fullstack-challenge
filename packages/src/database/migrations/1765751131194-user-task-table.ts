import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTaskTable1765751131194 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE user_task (
                user_id uuid NOT NULL, 
                task_id uuid NOT NULL, 
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

                CONSTRAINT user_task_pk PRIMARY KEY (user_id, task_id),

                CONSTRAINT user_task_user_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                CONSTRAINT user_task_task_fk FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
            );    
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query("DROP TABLE user_task;")
    }

}
