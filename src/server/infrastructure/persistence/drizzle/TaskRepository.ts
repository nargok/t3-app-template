import { eq } from "drizzle-orm";
import { injectable } from "tsyringe";
import { db } from "@/server/db";
import { tasks } from "@/server/db/schema";
import type { ITaskRepository } from "@/server/domain/task/ITaskRepository";
import { Task } from "@/server/domain/task/Task";
import { TaskId } from "@/server/domain/task/TaskId";
import { TaskTitle } from "@/server/domain/task/TaskTitle";

@injectable()
export class TaskRepository implements ITaskRepository {
    async findById(id: TaskId): Promise<Task | null> {
        const result = await db.query.tasks.findFirst({
            where: eq(tasks.id, id.value),
        })

        if (!result) {
            return null;
        }
        return new Task(
            new TaskId(result.id),
            new TaskTitle(result.title),
        );
    }

    async findByTitle(title: string): Promise<Task | null> {
        const result = await db.query.tasks.findFirst({
            where: eq(tasks.title, title),
        })

        if (!result) {
            return null;
        }
        return new Task(
            new TaskId(result.id),
            new TaskTitle(result.title),
        );
    }

    async findAll(): Promise<Task[]> {
        const result = await db.query.tasks.findMany();

        return result.map((task) => {
            return new Task(
                new TaskId(task.id),
                new TaskTitle(task.title),
            );
        });
    }

    async save(task: Task): Promise<void> {
        await db.insert(tasks).values({
            id: task.id.value,
            title: task.title.value,
        }).onConflictDoUpdate({
            target: tasks.id,
            set: {
                title: task.title.value,
            },
        });
    }

    async delete(task: Task): Promise<void> {
        await db.delete(tasks).where(eq(tasks.id, task.id.value)).then(() => {
            return;
        });
    }
}
