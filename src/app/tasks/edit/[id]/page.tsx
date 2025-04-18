"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/trpc/react";
import { useParams, useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(255, { message: "Title must be less than 255 characters" }),
});

export default function TaskEditPage() {
  const router = useRouter();
  const utils = api.useUtils();
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : ""; // Ensure id is a string

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const updateTask = api.task.update.useMutation({
    onSuccess: async () => {
      await utils.task.all.invalidate();
      router.refresh();
      router.push("/tasks");
    },
  });

  const deleteTask = api.task.delete.useMutation({
    onSuccess: async () => {
      await utils.task.all.invalidate();
      router.refresh();
      router.push("/tasks");
    },
  });

  async function onSubmit(value: z.infer<typeof formSchema>) {
    updateTask.mutate({ id, title: value.title });
  }

  async function onDelete() {
    deleteTask.mutate({ id });
  }

  const { data: task, isLoading } = api.task.findById.useQuery(
    { id },
    {
      refetchOnMount: true,
      staleTime: 0,
    },
  );

  useEffect(() => {
    if (task) {
      form.reset({
        title: task.title,
      });
    }
  }, [task, form]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-4 flex justify-between">
        <h2>タスク詳細</h2>
        <Button variant="destructive" onClick={onDelete}>
          削除
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between space-x-4">
            <Button type="submit">更新</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
