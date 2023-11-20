import * as z from "zod"

export const PreregisteredUserModel = z.object({
  id: z.string(),
  email: z.string().nullish(),
  locale: z.string().nullish(),
})
