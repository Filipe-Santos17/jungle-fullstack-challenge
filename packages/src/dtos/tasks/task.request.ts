// Atribuição a múltiplos usuários. - id e tabela intermediaria
// Comentários: criar e listar em cada tarefa.
import { IsString, IsNotEmpty, IsDate, IsEnum } from "class-validator"
import { Type } from 'class-transformer';

enum taskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT=  "urgent",
}

enum taskStatus {
    TODO  = "todo",
    IN_PROGRESS = "in_progress",
    REVIEW  = "review",
    DONE = "done",
}

export class CreateTaskRequest {
    @IsString()
    @IsNotEmpty()
    título: string;

    @IsString()
    descrição: string;

    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    prazo: string;

    @IsEnum(taskPriority, { message: "A prioridade deve ser uma das seguintes opções: low, medium, high, urgent" })
    prioridade: string;

    @IsEnum(taskStatus, { message: "O status deve ser uma das seguintes opções: todo, in_progress, review, done" })
    status: string;
}