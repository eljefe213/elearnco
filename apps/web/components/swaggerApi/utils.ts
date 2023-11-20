import { FolderModel, TPartialFolder } from "schemas";
import * as z from "zod";

function createPartialObjectFromZodModel(model, excludedKeys: string[] = []) {
  const partialObject = {};

  for (const field of Object.keys(model.shape)) {
    if (!excludedKeys.includes(field)) {
      partialObject[field] = getDefaultValueForField(model.shape[field]);
    }
  }

  return partialObject;
}

function getDefaultValueForField(zodType) {
  if (zodType instanceof z.ZodString) {
    return "";
  } else if (zodType instanceof z.ZodDate) {
    return new Date();
  } else if (zodType instanceof z.ZodBoolean) {
    return false;
  } else {
    // Gérer d'autres types au besoin
    return null;
  }
}
/* you can test api with user id cln4kv8xc000h0989bop6u7k8 */
export function setPath(path: string) {
  return path;
}
export const folderJSON = createPartialObjectFromZodModel(FolderModel, [
  "id",
  "createdAt",
  "updatedAt",
]) as TPartialFolder;
