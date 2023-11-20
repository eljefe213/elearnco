import * as z from "zod"
import { Role } from "@prisma/client"
import { CompleteFolder, RelatedFolderModel, CompleteCourse, RelatedCourseModel, CompleteLearner, RelatedLearnerModel, CompleteCollaborator, RelatedCollaboratorModel, CompletePasswordResetToken, RelatedPasswordResetTokenModel, CompleteEmailVerificationToken, RelatedEmailVerificationTokenModel, CompleteAccount, RelatedAccountModel, CompleteSession, RelatedSessionModel, CompleteAuthor, RelatedAuthorModel } from "./index"

export const UserModel = z.object({
  id: z.string(),
  name: z.string().nullish(),
  email: z.string().nullish(),
  emailVerified: z.date().nullish(),
  password: z.string(),
  image: z.string().nullish(),
  locale: z.string().nullish(),
  createdAt: z.date(),
  lastActivityAt: z.date(),
  updatedAt: z.date(),
  role: z.nativeEnum(Role),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  Folder: CompleteFolder[]
  Course: CompleteCourse[]
  Learner: CompleteLearner[]
  Collaborator: CompleteCollaborator[]
  passwordResetTokens: CompletePasswordResetToken[]
  emailVerificationTokens: CompleteEmailVerificationToken[]
  accounts: CompleteAccount[]
  sessions: CompleteSession[]
  author: CompleteAuthor[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  Folder: RelatedFolderModel.array(),
  Course: RelatedCourseModel.array(),
  Learner: RelatedLearnerModel.array(),
  Collaborator: RelatedCollaboratorModel.array(),
  passwordResetTokens: RelatedPasswordResetTokenModel.array(),
  emailVerificationTokens: RelatedEmailVerificationTokenModel.array(),
  accounts: RelatedAccountModel.array(),
  sessions: RelatedSessionModel.array(),
  author: RelatedAuthorModel.array(),
}))
