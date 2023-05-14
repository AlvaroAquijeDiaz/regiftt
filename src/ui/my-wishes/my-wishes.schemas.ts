import { z } from "zod";

export const NewWishSchema = z
  .object({
    name: z.string().min(1).max(100),
    description: z.string().max(1000).optional(),
    url: z.string().optional(),
    priceKnown: z.boolean().optional().default(false),
    price: z
      .number({
        // TODO: Continue refining
        invalid_type_error: "Please enter a valid number",
      })
      .positive()
      .max(10000000, {
        message: "Mmm 10M for a gift is a bit too much, don't you think?",
      })
      .optional(),
  })
  .refine((data) => data.priceKnown === true && data.price !== undefined, {
    message: "Please enter a price if you know an estimate",
  });

export type NewWishSchema = z.infer<typeof NewWishSchema>;
