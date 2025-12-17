import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException, ClientProxy } from '@nestjs/microservices';
import { Repository } from 'typeorm';

import {
  CreateTaskRequest,
  InsertInDbCommentRequest,
  ParamsGetCommentRequest,
  ParamsGetTaskRequest,
  UpdateTaskRequest
} from '@app/packages';

import { EntityTasks, EntityComments, RmqService } from "@app/packages"

@Injectable()
export class TasksService {
  private notificationClient: ClientProxy;

  constructor(
    @InjectRepository(EntityTasks)
    private readonly entityTasks: Repository<EntityTasks>,

    @InjectRepository(EntityComments)
    private readonly EntityComments: Repository<EntityComments>,

    private readonly rmqService: RmqService,
  ) {
    this.notificationClient = this.rmqService.getClientProxy('NOTIFICATION'); //Env Name
  }

  async createTask(task: CreateTaskRequest) {
    await this.entityTasks.insert(task)

    this.notificationClient.emit('notification_dispatch', {
      userId: task.user_id,
      type: 'TASK_CREATED',
      message: 'Nova task criada',
      metadata: {
        title: task.titulo,
      },
    });

    return "ok"
  }

  async updateTask(id: string, task: UpdateTaskRequest) {
    const taskToUpdate = await this.entityTasks.preload({
      id,
      ...task,
    });

    if (!taskToUpdate) {
      throw new RpcException({
        statusCode: 404,
        message: 'Task não encontrada',
      });
    }

    await this.entityTasks.save(taskToUpdate);

    this.notificationClient.emit('notification_dispatch', {
      userId: taskToUpdate.user_id,
      type: 'TASK_UPDATED',
      message: 'Task atualizada',
      metadata: {
        taskId: taskToUpdate.id,
      },
    });

    return taskToUpdate;
  }

  async findAllTaskByUser(params: ParamsGetTaskRequest): Promise<EntityTasks[]> {
    const userId = params.userId
    const page = params.page ?? 1;
    const size = params.size ?? 30;

    const allTasks = await this.entityTasks.find({
      where: {
        user_id: userId
      },
      skip: (page - 1) * size,
      take: params.size
    })

    return allTasks
  }

  async findOneTaskById(idTask: { id: string }): Promise<EntityTasks> {
    const taskSelected = await this.entityTasks.findOne({
      where: {
        id: idTask.id
      }
    })

    if (!taskSelected) {
      throw new RpcException({
        statusCode: 404,
        message: 'Task não encontrada',
      });
    }

    return taskSelected
  }

  async deleteOneTaskById(idTask: { id: string }): Promise<string> {
    const taskToDelete = await this.entityTasks.findOneBy({ id: idTask.id });

    if (!taskToDelete) {
      throw new RpcException({
        statusCode: 404,
        message: 'Task não encontrada',
      });
    }

    await this.entityTasks.remove(taskToDelete);

    this.notificationClient.emit('notification_dispatch', {
      userId: taskToDelete.user_id,
      type: 'TASK_DELETED',
      message: 'Task removida',
      metadata: {
        taskId: taskToDelete.id,
      },
    });

    return idTask.id;
  }

  async createOneCommentTask(commentTask: InsertInDbCommentRequest): Promise<string> {
    const taskId = commentTask.taskId

    const task = await this.entityTasks.findOneBy({ id: taskId });

    if (!task) {
      throw new RpcException({
        statusCode: 404,
        message: 'Task não encontrada',
      });
    }

    await this.EntityComments.insert({
      user_id: commentTask.userId,
      comment_text: commentTask.comment.comment_text,
      task_id: taskId
    })

    this.notificationClient.emit('notification_dispatch', {
      userId: task.user_id,
      type: 'COMMENT_CREATED',
      message: 'Novo comentário na task',
      metadata: {
        taskId,
      },
    });

    return "ok"
  }

  async findAllCommentsByTask(params: ParamsGetCommentRequest): Promise<EntityComments[]> {
    const taskId = params.taskId

    const task = await this.entityTasks.findOneBy({ id: taskId });

    if (!task) {
      throw new RpcException({
        statusCode: 404,
        message: 'Task não encontrada',
      });
    }

    const page = params.page ?? 1;
    const size = params.size ?? 30;

    const allCommentsByTask = await this.EntityComments.find({
      where: {
        task_id: taskId,

      },
      skip: (page - 1) * size,
      take: params.size
    })

    return allCommentsByTask
  }
}
