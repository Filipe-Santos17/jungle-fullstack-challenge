import { Controller, Get, Param, Post, Query, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { CurrentUserId } from "../decorators/CurrentUser.decorator";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";

import { RmqService, DataTaskRequest, CreateCommentRequest } from '@app/packages';

@Controller("/api/tasks")
export class TaskController {
  private client: ClientProxy;

  constructor(private readonly rmqService: RmqService) {
    this.client = this.rmqService.getClientProxy("TASKS")
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Post()
  async postTask(
    @CurrentUserId() userId: string,
    @Body() task: DataTaskRequest
  ) {
    return await lastValueFrom(
      this.client.send("task_create", { ...task, user_id: userId })
    )
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  async getOneTask(
    @CurrentUserId() userId: string,
    @Param("id") id: string
  ) {
    return await lastValueFrom(
      this.client.send("task_getone", { id, userId })
    )
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async deleteOneTask(
    @Param("id") id: string
  ) {
    return await lastValueFrom(
      this.client.send("task_deleteone", { id })
    )
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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
