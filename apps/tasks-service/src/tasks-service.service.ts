import { Injectable } from '@nestjs/common';
import { CreateTaskRequest } from '@app/packages';

@Injectable()
export class TasksService {
  createTask(task: CreateTaskRequest) {
    console.log(task);
    return "ok"
  }
}
