import { type Task } from "./Task";
import { type TaskId } from "./TaskId";

export const TaskRepositoryToken = Symbol.for("ITaskRepository");

export interface ITaskRepository {
  findById(id: TaskId): Promise<Task | null>;
  findByTitle(title: string): Promise<Task | null>;
  findAll(): Promise<Task[]>;
  save(task: Task): Promise<void>;
  delete(task: Task): Promise<void>;
}
