import { z } from "zod";

export const NewWishSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(1000).optional(),
  url: z.string().optional(),
  priceKnown: z.boolean().optional().default(false),
  price: z
    .number({
      invalid_type_error: "Please enter a valid number",
    })
    .positive()
    .max(10000000, {
      message: "Mmm 10M for a gift is a bit too much, don't you think?",
    })
    .optional(),
  tags: z.array(z.string()).optional().default([]),
  private: z.boolean().default(false),
  linkMeta: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      image: z.string().optional(),
    })
    .optional(),
});

export type NewWishSchema = z.infer<typeof NewWishSchema>;

export const newListSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(1000).optional(),
  wishIDs: z.array(z.string()).optional().default([]),
  private: z.boolean().default(false),
  dueOn: z.date().optional(),
});

export type NewListSchema = z.infer<typeof newListSchema>;
