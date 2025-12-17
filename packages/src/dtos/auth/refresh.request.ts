import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RefreshRequest {
    @ApiProperty({ description: "Token para reload do token access. Enviado por cookies"})
    @IsString()
    @IsNotEmpty()
    refresh_token: string;
}