import * as z from "zod";
export const FolderSchema = z.object({
    title: z.string().min(3, { message: "Title must be atleast 3 characters" }),
    
  });