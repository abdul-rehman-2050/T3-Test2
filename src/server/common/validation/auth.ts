import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(12),
});


export type ILogin = z.infer<typeof loginSchema>;
