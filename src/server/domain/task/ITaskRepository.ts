import type { Task } from "./task";

export interface ITaskRepository {
    findById(id: string): Promise<Task | null>;
    findByTitle(title: string): Promise<Task | null>;
    findAll(): Promise<Task[]>;
    save(task: Task): Promise<void>;
    delete(task: Task): Promise<void>;
}
