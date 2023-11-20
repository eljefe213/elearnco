import * as z from "zod"

export const ImageModel = z.object({
  id: z.string(),
  image: z.string(),
  alt: z.string(),
  x: z.string().nullish(),
  y: z.string().nullish(),
  updatedAt: z.date(),
  createdAt: z.date(),
})
