import { z } from "zod";

export const newUserSchema = z.object({
  username: z
    .string()
    .regex(/[a-z0-9]/)
    .min(3)
    .max(20),
  userId: z.string().cuid(),
});

export type NewUserSchema = z.infer<typeof newUserSchema>;
