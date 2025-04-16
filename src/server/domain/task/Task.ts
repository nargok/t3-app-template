import { TaskId } from "./TaskId";
import type { TaskTitle } from "./TaskTitle";

export class Task {
    readonly id: TaskId;
    private _title: TaskTitle;

    constructor(id: TaskId, title: TaskTitle) {
        this.id = id;
        this._title = title;
    }

    get title(): TaskTitle {
        return this._title;
    }

    changeTitle(newTitle: TaskTitle): void {
        // TODO : Add validation logic for title change
        this._title = newTitle;
    }

    static create(title: TaskTitle): Task {
        const id = TaskId.generate();
        return new Task(id, title);
    }

    equals(other: Task): boolean {
        return this.id.equals(other.id);
    }
}
