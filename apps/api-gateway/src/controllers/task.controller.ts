import { Controller, Get, Param, Post, Query, Body, Put, Delete } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { RmqService } from '@app/packages';
import { CreateTaskRequest } from '@app/packages';

@Controller("/api/tasks")
export class TaskController {
  private client: ClientProxy;

  constructor(private readonly rmqService: RmqService) {
    this.client = this.rmqService.getClientProxy("TASKS")
  }

  @Get()
  getTasks(
    @Query("page") page: number,
    @Query("size") size: number
  ): string {
    return "this.rmqService.getOptions()";
  }

  @Post()
  async postTask(@Body() task: CreateTaskRequest) {
    return await lastValueFrom(
      this.client.send("task_create", task)
    )
  }

  @Get(":id")
  async getOneTask(@Param("id") id: number): Promise<string> {
    return "this.appService.getHello()";
  }

  @Put(":id")
  async putOneTask(@Param("id") id: number): Promise<string> {
    return "this.appService.getHello()";
  }

  @Delete(":id")
  async deleteOneTask(@Param("id") id: number): Promise<string> {
    return "this.appService.getHello()";
  }
}
