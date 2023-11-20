import { toast } from "sonner";
import {
  apiCreateFolder,
  apiDeleteFolder,
  apiGetFolders,
  apiUpdateFolder,
} from "./api.request";
import { TPartialFolder } from "schemas/api";
import { Folder } from "@prisma/client";

export const pathApiFolders = "/api/folders";
export const pathApiFolder = "/api/folder";

/**
 * Get All user folders
 * @returns Folder[] | null
 */
export const getFolders = async (): Promise<Folder[] | null> => {
  const res = await apiGetFolders();
  if (res.status === "success") {
    return res.data as unknown as Folder[];
  } else {
    toast.error(res as unknown as string);
    return null;
  }
};

/**
 * Add a new folder
 * @param editObjFolder 
 * @returns Folder | null
 */
export const createFolderFromApi = async (
  editObjFolder: TPartialFolder
): Promise<Folder | null> => {
  const res = await apiCreateFolder(editObjFolder);

  if (res.status === "success") {
    toast.success("Folder created successfully!");
    return res.data as unknown as Folder;
  } else {
    toast.error(res as unknown as string);
    return null;
  }
};

/**
 * Delete a folder
 * @param id 
 * @returns Folder | null
 */
export const deleteFolder = async (id: string): Promise<Folder | null> => {
  const res = await apiDeleteFolder(id);
  if (res.status === "success") {
    toast.success("Folder deleted successfully!");
    return res.data as unknown as Folder;
  } else {
    toast.error(res as unknown as string);
    return null;
  }
};

/**
 * Update a folder
 * @param data 
 * @returns Folder | null
 */
export const updateFolder = async (data: {
  id: string;
  name: string;
}): Promise<Folder | null> => {
  const res = await apiUpdateFolder(data);
  if (res.status === "success") {
    toast.success("Folder updated successfully!");
    return res.data as unknown as Folder;
  } else {
    toast.error(res as unknown as string);
    return null;
  }
};

