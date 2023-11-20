import * as z from "zod"
import { CompleteUser, RelatedUserModel } from "./index"

export const LearnerModel = z.object({
  id: z.string(),
  email: z.string().nullish(),
  userId: z.string(),
  updatedAt: z.date(),
  createdAt: z.date(),
})

export interface CompleteLearner extends z.infer<typeof LearnerModel> {
  user: CompleteUser
}

/**
 * RelatedLearnerModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedLearnerModel: z.ZodSchema<CompleteLearner> = z.lazy(() => LearnerModel.extend({
  user: RelatedUserModel,
}))
