import { container } from "tsyringe";
import { TaskRepositoryToken } from "@/server/domain/task/ITaskRepository";
import { TaskRepository } from "@/server/infrastructure/persistence/drizzle/TaskRepository";
import { TaskUsecase } from "@/server/application/task/TaskUsecase";

container.registerSingleton(TaskRepositoryToken, TaskRepository);
container.registerSingleton(TaskUsecase);

export { container };
