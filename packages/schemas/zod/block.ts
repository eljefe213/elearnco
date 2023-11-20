import * as z from "zod"
import { CompletePage, RelatedPageModel } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const BlockModel = z.object({
  id: z.string(),
  type: z.string(),
  uuid: z.string(),
  groupId: z.string(),
  content: jsonSchema,
  pageId: z.string(),
  updatedAt: z.date(),
  createdAt: z.date(),
  index: z.number().int(),
})

export interface CompleteBlock extends z.infer<typeof BlockModel> {
  page: CompletePage
}

/**
 * RelatedBlockModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedBlockModel: z.ZodSchema<CompleteBlock> = z.lazy(() => BlockModel.extend({
  page: RelatedPageModel,
}))
