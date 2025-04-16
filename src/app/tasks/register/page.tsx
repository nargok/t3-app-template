"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    title: z.string()
      .min(1, { message: "Title is required" })
    //   .max(255, { message: "Title must be less than 255 characters" }),
});

export default function TaskRegisterPage() {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        }
    })

    async function onSubmit(value: z.infer<typeof formSchema>) {
        console.log(value);
        router.push("/tasks");
    }

    return (
        <div className="container mx-auto py-10">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                 control={form.control}
                 name="title"
                 render={({ field }) => (
                    <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                            <Input placeholder="task title" {...field} />
                        </FormControl>
                    </FormItem>
                    )}
                 />
                <Button type="submit">登録</Button>
            </form>
        </Form>
        </div>
    );
}