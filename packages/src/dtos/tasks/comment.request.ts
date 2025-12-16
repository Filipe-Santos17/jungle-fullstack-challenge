import { IsString, IsNotEmpty, IsInt } from "class-validator";

export class CreateCommentRequest {
  @IsString()
  @IsNotEmpty()
  comment_text: string;
}

export class InsertInDbCommentRequest {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  taskId: string;

  @IsNotEmpty()
  comment: CreateCommentRequest;
}

export class ParamsGetCommentRequest {
  @IsString()
  @IsNotEmpty()
  taskId: string;

  @IsInt()
  @IsNotEmpty()
  page: number;

  @IsInt()
  @IsNotEmpty()
  size: number;
}