import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { Repository } from 'typeorm';

import {
  CreateTaskRequest,
  InsertInDbCommentRequest,
  ParamsGetCommentRequest,
  ParamsGetTaskRequest,
  UpdateTaskRequest
} from '@app/packages';

import { EntityTasks, EntityComments } from "@app/packages"

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(EntityTasks)
    private readonly entityTasks: Repository<EntityTasks>,

    @InjectRepository(EntityComments)
    private readonly EntityComments: Repository<EntityComments>,
  ) { }

  async createTask(task: CreateTaskRequest) {
    await this.entityTasks.insert(task)

    return "ok"
  }

  async updateTask(id: string, task: UpdateTaskRequest) {
    const entity = await this.entityTasks.preload({
      id,
      ...task,
    });

    if (!entity) {
      throw new RpcException({
        statusCode: 404,
        message: 'Task não encontrada',
      });
    }

    await this.entityTasks.save(entity);

    return entity;
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
    const task = await this.entityTasks.findOneBy({ id: idTask.id });

    if (!task) {
      throw new RpcException({
        statusCode: 404,
        message: 'Task não encontrada',
      });
    }

    await this.entityTasks.remove(task);

    return idTask.id;
  }

  async createOneCommentTask(commentTask: InsertInDbCommentRequest): Promise<string> {
    const taskId = commentTask.taskId

    const task = await this.entityTasks.findOneBy({ id: taskId });

    if (!task) { //Não retorna 404
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
