import { ApiProperty } from "@nestjs/swagger";

export class ErrorResponseDto {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: "Bad Request" })
  error: string;

  @ApiProperty({
    example: ["Campo title é obrigatório"],
    isArray: true,
  })
  messages: string[];
}
