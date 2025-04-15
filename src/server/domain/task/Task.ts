import { TaskId } from "./taskId";

export class Task {
    readonly id: TaskId;
    private _title: string;

    constructor(id: TaskId, title: string) {
        this.id = id;
        this._title = title;
    }

    get title(): string {
        return this._title;
    }

    changeTitle(newTitle: string): void {
        if (newTitle.trim() === "") {
            throw new Error("Title cannot be empty");
        }
        this._title = newTitle;
    }

    static create(title: string): Task {
        if (title.trim() === "") {
            throw new Error("Title cannot be empty");
        }
        const id = TaskId.generate();
        return new Task(id, title);
    }

    equals(other: Task): boolean {
        return this.id.equals(other.id);
    }
}
