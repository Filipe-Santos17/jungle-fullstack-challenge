import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class RegisterRequest {
    @ApiProperty({ description: "Email do usuário a ser usado na conta", example: "user@example.com" })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: "Nome do usuário", example: "Jonh Doe" })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({ description: "Senha do usuário", example: "senha123" })
    @IsString()
    @IsNotEmpty()
    password: string;
}