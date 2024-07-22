import { z } from "zod";

export const userFormValidation = z.object({
  name: z
    .string()
    .min(2, { message: "Username must be between 2 and 50 characters" })
    .max(50, { message: "Username must be between 2 and 50 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});
