import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

export class TaskId {
    readonly value: string;

    constructor(value: string) {
        if (!uuidValidate(value)) {
            throw new Error("Invalid TaskID format");
        }
        this.value = value;
    }

    static generate(): TaskId {
        return new TaskId(uuidv4());
    }

    equals(other: TaskId): boolean {
        return this.value === other.value;
    }
}