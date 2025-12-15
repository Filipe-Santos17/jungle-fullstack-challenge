// Atribuição a múltiplos usuários. - id e tabela intermediaria
// Comentários: criar e listar em cada tarefa.
import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsDate, IsEnum, IsInt } from "class-validator"
import { Type } from 'class-transformer';

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

export class CreateTaskRequest {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  descricao: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  prazo: string;

  @IsEnum(taskPriority, { message: "A prioridade deve ser uma das seguintes opções: low, medium, high, urgent" })
  prioridade: string;

  @IsEnum(taskStatus, { message: "O status deve ser uma das seguintes opções: todo, in_progress, review, done" })
  status: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;
}

export class ParamsGetTaskRequest {
  @IsInt()
  page: number;

  @IsInt()
  size: number;

  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class TaskRequest {
  @IsString()
  id: string;

  @IsString()
  titulo: string;

  @IsString()
  descricao: string;

  @IsDate()
  prazo: string;

  @IsString()
  prioridade: string;

  @IsString()
  status: string;

  @IsDate()
  created_at: string;

  @IsDate()
  updated_at: string;
}

export class UpdateTaskRequest extends PartialType(CreateTaskRequest) { }

export class ParamUpdateTaskRequest {
  @IsString()
  id: string;

  task: UpdateTaskRequest;
}