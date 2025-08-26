import { z } from "zod";

export const SignUpSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  username: z.string().optional(),
  company: z.string().optional(),
  root: z.string().optional(),
});

export type SignUpFormValues = z.infer<typeof SignUpSchema>;

export const SignInSchema = z
  .object({
    email: z.email("Enter a valid email").optional(),
    username: z.string().min(1, "Username is required").optional(),
    password: z.string().min(1, "Password is required"),
    root: z.string().optional(),
  })
  .refine((data) => !!(data.email || data.username), {
    message: "Email or username is required",
    path: ["email"],
  });

export type SignInFormValues = z.infer<typeof SignInSchema>;
