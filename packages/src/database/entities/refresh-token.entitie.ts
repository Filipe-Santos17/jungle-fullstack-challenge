import { Entity, PrimaryColumn, Column } from "typeorm"

@Entity('refresh_tokens')
export class EntityRefreshToken {
    @PrimaryColumn('uuid')
    jti: string;

    @Column('uuid')
    user_id: string;

    @Column('timestamptz')
    expires_at: Date;

    @Column('timestamptz', { default: () => 'now()' })
    created_at: Date;
}
