import { inject, injectable } from "tsyringe";
import { TaskRepositoryToken, type ITaskRepository } from "@/server/domain/task/ITaskRepository";
import type { TaskCreateDto } from "./dto/TaskDto";
import { Task } from "@/server/domain/task/Task";
import { TaskTitle } from "@/server/domain/task/TaskTitle";

@injectable()
export class TaskUsecase {
    constructor(
        @inject(TaskRepositoryToken) private taskRepository: ITaskRepository,
    ){}

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
    }
}