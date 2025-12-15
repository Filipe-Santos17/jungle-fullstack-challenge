import { MigrationInterface, QueryRunner } from "typeorm";

export class RefreshTokenTable1765756716231 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE refresh_tokens (
                jti UUID,
                user_id UUID NOT NULL UNIQUE,
                expires_at TIMESTAMPTZ NOT NULL,
                created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

                CONSTRAINT refresh_tokens_pk PRIMARY KEY (jti),
                
                CONSTRAINT refresh_tokens_user_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query("DROP TABLE refresh_tokens;")
    }

}
