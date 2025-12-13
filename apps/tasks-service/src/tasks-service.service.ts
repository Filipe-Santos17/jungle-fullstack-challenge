import { Injectable } from '@nestjs/common';
import { CreateTaskRequest } from '../../../packages/src/dtos/tasks/task.request';

@Injectable()
export class TasksService {
  createTask(task: CreateTaskRequest) {
    console.log(task);
    return "ok"
  }
}
