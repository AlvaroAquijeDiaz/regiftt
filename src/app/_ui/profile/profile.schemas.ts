import { z } from "zod";

export const newUserSchema = z.object({
  username: z
    .string()
    .regex(/^[a-zA-Z0-9_-]{3,19}$/, {
      message:
        "Username must start with a letter and contain only letters, numbers, and underscores",
    })
    .min(4)
    .max(20, {
      message: "Username must be between 4 and 20 characters long",
    }),
  userId: z.string().cuid(),
});

export type NewUserSchema = z.infer<typeof newUserSchema>;

export const editProfileSchema = newUserSchema
  .omit({
    userId: true,
  })
  .extend({
    bio: z
      .string()
      .max(160, {
        message: "Bio must be less than 160 characters",
      })
      .optional(),
    name: z
      .string()
      .max(50, {
        message: "Name must be less than 50 characters",
      })
      .optional(),
  })
  .partial();

export type EditProfileSchema = z.infer<typeof editProfileSchema>;
