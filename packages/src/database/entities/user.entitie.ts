import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "users" })
export class EntityUsers {
    @ApiProperty()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty()
    @Column("varchar", { unique: true, nullable: false })
    email: string;

    @ApiProperty()
    @Column("varchar", { nullable: false })
    username: string;

    @ApiProperty()
    @Column("varchar", { nullable: false })
    password: string;
}
