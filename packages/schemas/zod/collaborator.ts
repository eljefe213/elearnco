import * as z from "zod"
import { CompleteUser, RelatedUserModel } from "./index"

export const CollaboratorModel = z.object({
  id: z.string(),
  email: z.string().nullish(),
  userId: z.string(),
  updatedAt: z.date(),
  createdAt: z.date(),
})

export interface CompleteCollaborator extends z.infer<typeof CollaboratorModel> {
  user: CompleteUser
}

/**
 * RelatedCollaboratorModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCollaboratorModel: z.ZodSchema<CompleteCollaborator> = z.lazy(() => CollaboratorModel.extend({
  user: RelatedUserModel,
}))
