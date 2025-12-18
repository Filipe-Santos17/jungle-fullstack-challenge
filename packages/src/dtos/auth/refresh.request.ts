import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RefreshRequest {
    @ApiProperty({ description: "Token para reload do token access. Enviado por cookies" })
    @IsString()
    @IsNotEmpty()
    refresh_token: string;
}

export class AllTokensRequest {
    @ApiProperty({ description: "Token para acesso. Enviado por cookies" })
    @IsString()
    @IsNotEmpty()
    access_token: string;

    @ApiProperty({ description: "Token para reload do token access. Enviado por cookies" })
    @IsString()
    @IsNotEmpty()
    refresh_token: string;
}