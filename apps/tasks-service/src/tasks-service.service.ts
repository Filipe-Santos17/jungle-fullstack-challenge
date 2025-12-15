import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { Repository } from 'typeorm';

import { CreateTaskRequest, EntityTasks, ParamsGetTaskRequest, UpdateTaskRequest } from '@app/packages';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(EntityTasks)
    private readonly entityTasks: Repository<EntityTasks>
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
      where:{
        user_id: userId
      },
      skip: (page - 1) * size,
      take: params.size
    })

    return allTasks
  }

  async findOneTaskById(idTask: string): Promise<EntityTasks> {
    const taskSelected = await this.entityTasks.findOne({
      where: {
        id: idTask
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

  async deleteOneTaskById(idTask: string): Promise<string> {
    const task = await this.entityTasks.findOneBy({ id: idTask });

    if (!task) {
      throw new RpcException({
        statusCode: 404,
        message: 'Task não encontrada',
      });
    }

    await this.entityTasks.remove(task);

    return task.id;
  }
}
