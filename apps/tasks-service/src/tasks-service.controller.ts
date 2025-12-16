import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { TasksService } from './tasks-service.service';
import { CreateTaskRequest, InsertInDbCommentRequest, ParamsGetTaskRequest, ParamUpdateTaskRequest, ParamsGetCommentRequest } from '@app/packages';

@Controller()
export class TasksServiceController {
  constructor(private readonly tasksService: TasksService) { }

  @MessagePattern("task_create")
  async postTask(@Payload() task: CreateTaskRequest) {
    return this.tasksService.createTask(task)
  }

  @MessagePattern("task_getall")
  async getAllTasks(@Payload() params: ParamsGetTaskRequest) {
    return this.tasksService.findAllTaskByUser(params)
  }

  @MessagePattern("task_getone")
  async getOneTask(@Payload() id: { id: string }) {
    return this.tasksService.findOneTaskById(id)
  }

  @MessagePattern("task_updateone")
  async updateOneTask(@Payload() taskToUpdate: ParamUpdateTaskRequest) {
    return this.tasksService.updateTask(taskToUpdate.id, taskToUpdate.task)
  }

  @MessagePattern("task_deleteone")
  async deleteOneTask(@Payload() id: { id: string }) {
    return this.tasksService.deleteOneTaskById(id)
  }

  @MessagePattern("task_create_comment")
  async postTaskComment(@Payload() taskComment: InsertInDbCommentRequest) {
    return this.tasksService.createOneCommentTask(taskComment)
  }

  @MessagePattern("task_getall_comments")
  async getAllTaskComments(@Payload() taskComment: ParamsGetCommentRequest) {
    return this.tasksService.findAllCommentsByTask(taskComment)
  }
}
