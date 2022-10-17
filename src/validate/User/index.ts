import { z } from "zod";

export interface CreateUserInterface {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    password: string;
  }

const rePhoneNumber = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
export const UserValidationSchema = z
  .object({
    firstName: z.string().min(1, { message: "Firstname is required" }),
    lastName: z.string().min(1, { message: "Lastname is required" }),
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    phone: z.string().min(1, { message: "Phone number is required" })
    .regex(rePhoneNumber,{message: "invalid phone number"}),

    password: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" }),
      
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
    terms: z.literal(true, {
      errorMap: () => ({ message: "You must accept Terms and Conditions" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });

export type UserValidationSchemaType = z.infer<typeof UserValidationSchema>;
