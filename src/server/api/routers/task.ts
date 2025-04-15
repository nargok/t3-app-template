import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { container } from "@/lib/diContainer";
import { TaskUsecase } from "@/server/application/task/TaskUsecase";

const taskUsecase = container.resolve(TaskUsecase);

export const taskRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const tasks = await taskUsecase.getAllTasks();
    return tasks ?? [];
  }),
});
