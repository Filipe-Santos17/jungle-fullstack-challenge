// Atribuição a múltiplos usuários. - id e tabela intermediaria
// Comentários: criar e listar em cada tarefa.
import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsDate, IsEnum, IsInt } from "class-validator"
import { Type } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";

enum taskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent",
}

enum taskStatus {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  REVIEW = "review",
  DONE = "done",
}

export class DataTaskRequest {
  @ApiProperty({ description: "Titulo da task", example: "titulo" })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({ description: "Descrição da task", example: "" })
  @IsString()
  descricao: string;

  @ApiProperty({ description: "Data da task", example: new Date() })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  prazo: string;

  @ApiProperty({ description: "Nivel de importância da task", example: "medium" })
  @IsEnum(taskPriority, { message: "A prioridade deve ser uma das seguintes opções: low, medium, high, urgent" })
  prioridade: string;

  @ApiProperty({ description: "Status da task", example: "todo" })
  @IsEnum(taskStatus, { message: "O status deve ser uma das seguintes opções: todo, in_progress, review, done" })
  status: string;
}

export class CreateTaskRequest extends DataTaskRequest {
  @ApiProperty({ description: "Uuid para associar o usuário como criador da task" })
  @IsString()
  @IsNotEmpty()
  user_id: string;
}

export class ParamsGetTaskRequest {
  @ApiProperty({ description: "Numéro da pagína da lista de tags, feito para filtar o retorno do banco de tasks", example: 1 })
  @IsInt()
  page: number;

  @ApiProperty({ description: "Numéro de tasks selecionadas na pagína, feito para filtar o retorno do banco de tasks", example: 30 })
  @IsInt()
  size: number;

  @ApiProperty({ description: "Id do criador" })
  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class TaskRequest {
  @ApiProperty({ description: "ID(UUID) da task" })
  @IsString()
  id: string;

  @ApiProperty({ description: "Titulo da task", example: "titulo" })
  @IsString()
  titulo: string;

  @ApiProperty({ description: "Descrição da task", example: "" })
  @IsString()
  descricao: string;

  @ApiProperty({ description: "Data da task", example: new Date() })
  @IsDate()
  prazo: string;

  @ApiProperty({ description: "Nivel de importância da task", example: "medium" })
  @IsString()
  prioridade: string;

  @ApiProperty({ description: "Status da task", example: "todo" })
  @IsString()
  status: string;

  @ApiProperty({ description: "Data de criação da task" })
  @IsDate()
  created_at: string;

  @ApiProperty({ description: "Data de atualização da task" })
  @IsDate()
  updated_at: string;
}

export class UpdateTaskRequest extends PartialType(CreateTaskRequest) { }

export class ParamUpdateTaskRequest {
  @IsString()
  id: string;

  task: UpdateTaskRequest;
}