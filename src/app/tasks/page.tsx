import { api, HydrateClient } from "@/trpc/server";

export default function TasksPage() {
    const { data: tasks, isLoading } = api.task.all()

    if (isLoading) {
        return <div>Loading...</div>;
    }

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