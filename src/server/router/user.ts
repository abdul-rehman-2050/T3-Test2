import { createRouter } from "./context";
import { z } from "zod";


interface User {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    password: string;
  }


export const userRouter = createRouter()
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
  })
  .mutation("store", {
    input:z.object({ 
        firstname: z.string(),
        lastname: z.string(),
        email: z.string(),
        phone:z.string(),
        password:z.string(),
        })
      .required(),
    async resolve({ ctx, input }) {

        const user: User = {
            firstname: input.firstname,
            lastname: input.lastname,
            email: input.email,
            phone: input.phone,
            password: input.password
    
          };
     
      const userID = await ctx.prisma.user.create({data:user})
      return userID;
    }
  })
