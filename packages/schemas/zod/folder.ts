import * as z from "zod"
import { CompleteUser, RelatedUserModel, CompleteCourse, RelatedCourseModel } from "./index"

export const FolderModel = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  updatedAt: z.date(),
  createdAt: z.date(),
})

export interface CompleteFolder extends z.infer<typeof FolderModel> {
  user: CompleteUser
  Course: CompleteCourse[]
}

/**
 * RelatedFolderModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedFolderModel: z.ZodSchema<CompleteFolder> = z.lazy(() => FolderModel.extend({
  user: RelatedUserModel,
  Course: RelatedCourseModel.array(),
}))
