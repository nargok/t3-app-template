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
    create: protectedProcedure
        .input(
            z.object({
                title: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            return await taskUsecase.createTask(input);
        }),
});
