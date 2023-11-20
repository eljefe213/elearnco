import * as z from "zod"
import { Role } from "@prisma/client"
import { CompleteCourse, RelatedCourseModel, CompleteUser, RelatedUserModel } from "./index"

export const AuthorModel = z.object({
  id: z.string(),
  image: z.string(),
  updatedAt: z.date(),
  createdAt: z.date(),
  role: z.nativeEnum(Role),
  name: z.string().nullish(),
  userId: z.string(),
})

export interface CompleteAuthor extends z.infer<typeof AuthorModel> {
  Course: CompleteCourse[]
  user: CompleteUser
}

/**
 * RelatedAuthorModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedAuthorModel: z.ZodSchema<CompleteAuthor> = z.lazy(() => AuthorModel.extend({
  Course: RelatedCourseModel.array(),
  user: RelatedUserModel,
}))
