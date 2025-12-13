import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { TasksService } from './tasks-service.service';
import { CreateTaskRequest } from '../../../packages/src/dtos/tasks/task.request';

@Controller()
export class TasksServiceController {
  constructor(private readonly tasksService: TasksService) { }

  @MessagePattern("task_create")
  async postTask(@Payload() task: CreateTaskRequest) {
    return this.tasksService.createTask(task)
  }

  // @Get(":id")
  // getOneTask(@Param("id") id: number): string {
  //   return "this.tasksService.getHello()";
  // }

  // @Put(":id")
  // putOneTask(@Param("id") id: number): string {
  //   return "this.tasksService.getHello()";
  // }

  // @Delete(":id")
  // deleteOneTask(@Param("id") id: number): string {
  //   return "this.tasksService.getHello()";
  // }
}
