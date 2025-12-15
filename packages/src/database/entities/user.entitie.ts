import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "users" })
export class EntityUsers {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("varchar", { unique: true, nullable: false })
    email: string;

    @Column("varchar", { nullable: false })
    username: string;

    @Column("varchar", { nullable: false })
    password: string;
}
