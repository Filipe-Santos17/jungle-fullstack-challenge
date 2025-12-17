import { IsString, IsNotEmpty, IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateCommentRequest {
  @ApiProperty({ description: "Texto do comentário", example: "Comentário Task" })
  @IsString()
  @IsNotEmpty()
  comment_text: string;
}

export class InsertInDbCommentRequest {
  @ApiProperty({ description: "ID do usuário que fez comentário" })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: "ID da task associada ao comentário" })
  @IsString()
  @IsNotEmpty()
  taskId: string;

  @ApiProperty({ description: "Obj contendo o texto do comentário", example: { comment_text: "Comentário Task" } })
  @IsNotEmpty()
  comment: CreateCommentRequest;
}

export class ParamsGetCommentRequest {
  @ApiProperty({ description: "ID da task associada ao comentário" })
  @IsString()
  @IsNotEmpty()
  taskId: string;

  @ApiProperty({ description: "Numéro da pagína da lista de tags, feito para filtar o retorno do banco de tasks", example: 1 })
  @IsInt()
  @IsNotEmpty()
  page: number;

  @ApiProperty({ description: "Numéro de tasks selecionadas na pagína, feito para filtar o retorno do banco de tasks", example: 30 })
  @IsInt()
  @IsNotEmpty()
  size: number;
}