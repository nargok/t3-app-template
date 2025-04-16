import { inject, injectable } from "tsyringe";
import { TaskRepositoryToken, type ITaskRepository } from "@/server/domain/task/ITaskRepository";

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
}