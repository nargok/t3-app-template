import { inject, injectable } from "tsyringe";
import {
  TaskRepositoryToken,
  type ITaskRepository,
} from "@/server/domain/task/ITaskRepository";
import type { TaskCreateDto } from "./dto/TaskDto";
import { Task } from "@/server/domain/task/Task";
import { TaskId } from "@/server/domain/task/TaskId";
import { TaskTitle } from "@/server/domain/task/TaskTitle";

@injectable()
export class TaskUsecase {
  constructor(
    @inject(TaskRepositoryToken) private taskRepository: ITaskRepository,
  ) {}

  async getAllTasks() {
    const tasks = await this.taskRepository.findAll();
    return tasks.map((task) => ({
      id: task.id.value,
      title: task.title.value,
    }));
  }

  async createTask(input: TaskCreateDto) {
    const model = Task.create(new TaskTitle(input.title));
    await this.taskRepository.save(model);

    return {
      id: model.id.value,
      title: model.title.value,
    };
  }

  async findTaskById(id: string) {
    const taskId = new TaskId(id);
    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      return null;
    }

    return {
      id: task.id.value,
      title: task.title.value,
    };
  }

  async updateTask(id: string, input: { title: string }) {
    // Assuming TaskUpdateDto { title: string }
    const taskId = new TaskId(id);
    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }

    task.changeTitle(new TaskTitle(input.title));
    await this.taskRepository.save(task);

    return {
      id: task.id.value,
      title: task.title.value,
    };
  }

  async deleteTask(id: string) {
    const taskId = new TaskId(id);

    const taskExists = await this.taskRepository.findById(taskId);
    if (!taskExists) {
      throw new Error(`Task with id ${id} not found`);
    }

    try {
      await this.taskRepository.delete(taskExists);
      return true;
    } catch {
      return false;
    }
  }
}
