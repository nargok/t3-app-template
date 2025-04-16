import { api } from "@/trpc/server";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default async function TasksPage() {
    const tasks = await api.task.all();

    return (
        <div className="container mx-auto py-10">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">タスク一覧</CardTitle>
                    <CardDescription>
                        登録されているすべてのタスクの一覧です
                    </CardDescription>
                    <CardAction>
                        <Button>
                            新規タスク
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    {tasks && tasks.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">ID</TableHead>
                                    <TableHead>タイトル</TableHead>
                                    <TableHead className="text-right">アクション</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tasks.map((task) => (
                                    <TableRow key={task.id}>
                                        <TableCell className="font-medium">{task.id.substring(0, 8)}...</TableCell>
                                        <TableCell>{task.title}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm">
                                                詳細
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="text-center py-4">
                            <p className="text-muted-foreground">タスクが登録されていません</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}