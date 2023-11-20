import * as z from "zod"
import { CompleteUser, RelatedUserModel } from "./index"

export const EmailVerificationTokenModel = z.object({
  id: z.string(),
  userId: z.string(),
  /**
   * Hexadecimal version of the hashed token
   */
  token: z.string(),
  expiresAt: z.date(),
  updatedAt: z.date(),
  createdAt: z.date(),
  code: z.string(),
})

export interface CompleteEmailVerificationToken extends z.infer<typeof EmailVerificationTokenModel> {
  user: CompleteUser
}

/**
 * RelatedEmailVerificationTokenModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedEmailVerificationTokenModel: z.ZodSchema<CompleteEmailVerificationToken> = z.lazy(() => EmailVerificationTokenModel.extend({
  user: RelatedUserModel,
}))
