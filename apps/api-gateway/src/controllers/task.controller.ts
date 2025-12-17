import { Controller, Get, Param, Post, Query, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ApiOperation, ApiResponse, ApiCookieAuth } from '@nestjs/swagger';

import { CurrentUserId } from "../decorators/CurrentUser.decorator";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";

import { RmqService, DataTaskRequest, CreateCommentRequest, EntityTasks, EntityComments } from '@app/packages';


@ApiCookieAuth("access_token")
@UseGuards(JwtAuthGuard)
@Controller("/api/tasks")
export class TaskController {
  private client: ClientProxy;

  constructor(private readonly rmqService: RmqService) {
    this.client = this.rmqService.getClientProxy("TASKS")
  }

  @ApiOperation({ summary: "Retorna todas as tasks associadas ao usuário" })
  @ApiResponse({ status: 200, description: "Sucesso", type: EntityTasks, isArray: true })
  @Get()
  async getTasks(
    @CurrentUserId() userId: string,
    @Query("page") page: number,
    @Query("size") size: number,
  ) {
    return await lastValueFrom(
      this.client.send("task_getall", { page, size, userId })
    )
  }

  @ApiOperation({ summary: "Cria uma nova task" })
  @ApiResponse({ status: 200, description: "Sucesso", type: "string" })
  @Post()
  async postTask(
    @CurrentUserId() userId: string,
    @Body() task: DataTaskRequest
  ) {
    return await lastValueFrom(
      this.client.send("task_create", { ...task, user_id: userId })
    )
  }

  @ApiOperation({ summary: "Retorna / Seleciona task por id" })
  @ApiResponse({ status: 200, description: "Sucesso", type: EntityTasks })
  @Get(":id")
  async getOneTask(
    @CurrentUserId() userId: string,
    @Param("id") id: string
  ) {
    return await lastValueFrom(
      this.client.send("task_getone", { id, userId })
    )
  }

  @ApiOperation({ summary: "Altera task por id" })
  @ApiResponse({ status: 200, description: "Sucesso", type: EntityTasks })
  @Put(":id")
  async putOneTask(
    @CurrentUserId() userId: string,
    @Param("id") id: string,
    @Body() task: DataTaskRequest
  ) {
    return await lastValueFrom(
      this.client.send("task_updateone", { id, task, user_id: userId })
    )
  }

  @ApiOperation({ summary: "Deleta task por id" })
  @ApiResponse({ status: 200, description: "Sucesso", type: "string" })
  @Delete(":id")
  async deleteOneTask(
    @Param("id") id: string
  ) {
    return await lastValueFrom(
      this.client.send("task_deleteone", { id })
    )
  }

  @ApiOperation({ summary: "Cria um novo comentário na task" })
  @ApiResponse({ status: 200, description: "Sucesso", type: "string" })
  @Post(":id/comments")
  async postTaskComment(
    @CurrentUserId() userId: string,
    @Param("id") id: string,
    @Body() comment: CreateCommentRequest,
  ) {
    return await lastValueFrom(
      this.client.send("task_create_comment", { taskId: id, userId, comment })
    )
  }

  @ApiOperation({ summary: "Retorna / seleciona comentários da task por id" })
  @ApiResponse({ status: 200, description: "Sucesso", type: EntityComments, isArray: true })
  @Get(":id/comments")
  async getTaskComments(
    @Param("id") id: string,
    @Query("page") page: number,
    @Query("size") size: number,
  ) {
    return await lastValueFrom(
      this.client.send("task_getall_comments", { taskId: id, page, size })
    )
  }
}
