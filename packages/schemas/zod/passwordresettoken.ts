import * as z from "zod"
import { CompleteUser, RelatedUserModel } from "./index"

export const PasswordResetTokenModel = z.object({
  id: z.string(),
  userId: z.string(),
  /**
   * Hexadecimal version of the hashed token
   */
  token: z.string(),
  expiresAt: z.date(),
  updatedAt: z.date(),
  createdAt: z.date(),
})

export interface CompletePasswordResetToken extends z.infer<typeof PasswordResetTokenModel> {
  user: CompleteUser
}

/**
 * RelatedPasswordResetTokenModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPasswordResetTokenModel: z.ZodSchema<CompletePasswordResetToken> = z.lazy(() => PasswordResetTokenModel.extend({
  user: RelatedUserModel,
}))
