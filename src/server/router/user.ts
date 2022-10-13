import { createRouter } from "./context";
import { z } from "zod";

export const exampleRouter = createRouter()
  .query("user", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    },
  })
  .query("userAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.example.findMany();
    },
  });
