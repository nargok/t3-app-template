export class TaskTitle {
    readonly value: string;

    constructor(value: string) {
        if (value.length < 1 || value.length > 255) {
            throw new Error("Task title must be between 1 and 255 characters");
        }
        this.value = value;
    }
}
