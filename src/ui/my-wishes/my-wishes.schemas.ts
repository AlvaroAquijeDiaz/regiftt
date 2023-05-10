import { z } from "zod";

export const NewWishSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(1000).optional(),
  url: z.string().optional(),
  price: z
    .number({
      invalid_type_error: "Please enter a valid number",
    })
    .min(0)
    .max(10000000, {
      message: "Mmm 10M for a gift is a bit too much, don't you think?",
    })
    .optional(),
});

export type NewWishSchema = z.infer<typeof NewWishSchema>;
