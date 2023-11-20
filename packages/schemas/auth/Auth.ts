import * as z from "zod";
import { User } from "prisma/prisma-client";
export const userAuthSigninSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});

export const userAuthValidationSchema = z.object({
  code: z.string(),
  token: z.string(),
  id: z.string(),
});

export const userAuthSignupSchema = z
  .object({
    email: z.string().email(),
    name: z.string().min(2, { message: "Name must be atleast 2 characters" }),
    password: z
      .string()
      .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
      .regex(new RegExp(".*[a-z].*"), "One lowercase character")
      .regex(new RegExp(".*\\d.*"), "One number")
      .regex(
        new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
        "One special character"
      )
      .min(6, { message: "Password must be atleast 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const userAuthProfilSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2, { message: "Name must be atleast 2 characters" }),
});

export const userAuthPreregisterSchema = z.object({
  email: z.string().email(),
});

export type SafeUser = Omit<User & { role: string }, "password">;
