import { api } from "@/trpc/server";

export default async function TasksPage() {
    const tasks = await api.task.all()

    return (
        <div>
            <h1>Tasks</h1>
            <p>This is the tasks page.</p>
            {tasks ? (
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            {task.title}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No tasks found.</p>
            )}
        </div>
    );
}