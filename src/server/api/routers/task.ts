import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { container } from "@/lib/diContainer";
import { TaskUsecase } from "@/server/application/task/TaskUsecase";

const taskUsecase = container.resolve(TaskUsecase);

export const taskRouter = createTRPCRouter({
    all: protectedProcedure.query(async ({ ctx }) => {
        return await taskUsecase.getAllTasks();
    }),
    findById: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input, ctx }) => {
            return await taskUsecase.findTaskById(input.id);
        }),
    create: protectedProcedure
        .input(
            z.object({
                title: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            return await taskUsecase.createTask(input);
        }),
    update: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                title: z.string().optional(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            return await taskUsecase.updateTask(input);
        }),
    delete: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input, ctx }) => {
            return await taskUsecase.deleteTask(input.id);
        }),
});
