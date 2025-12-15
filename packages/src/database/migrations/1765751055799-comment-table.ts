import { MigrationInterface, QueryRunner } from "typeorm";

export class CommentTable1765751055799 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE comments (
                id uuid DEFAULT gen_random_uuid(),
                user_id uuid NOT NULL, 
                task_id uuid NOT NULL, 
                comment_text TEXT NOT NULL, 
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                
                CONSTRAINT comments_key_id PRIMARY KEY (id),

                CONSTRAINT comments_user_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                CONSTRAINT comments_task_fk FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query("DROP TABLE comments;")
    }

}
