import { createRouter } from "./context";
import { z } from "zod";
import { hash } from "argon2";
import { TRPCError } from "@trpc/server";


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

        const { firstname,lastname, email,phone, password } = input;
        const exists = await ctx.prisma.user.findFirst({
            where: { email },
          });
      
          if (exists) {
            throw new TRPCError({
              code: "CONFLICT",
              message: "User already exists.",
            });
          }

          
        const hashedPassword = await hash(password);
        const user: User = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            phone: phone,
            password: hashedPassword
    
          };
     
      const result = await ctx.prisma.user.create({data:user})
      return {
        status: 201,
        message: "Account created successfully",
        result: result.email,
      };
    }
  })
