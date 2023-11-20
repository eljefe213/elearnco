import { Page, Course, Folder } from "@prisma/client";
import { SafeUser } from "schemas/auth/Auth";
export type ErrorResponse = {
  status: string;
  message: string;
};
export type PageResponse = {
  status: string;
  data: { page: Page };
};
export type CourseResponse = {
  status: string;
  data: { course: Course };
};


export type FolderResponse = {
  status: string;
  data: { folder: Folder };
};

export type FoldersResponse = {
  status: string;
  data: [{ folder: Folder }];
};

export type CoursesResponse = {
  status: string;
  data: [{ course: Course }];
};

export type UserResponse = {
  status: string;
  data: { user: SafeUser };
};
export type PreregisterResponse = {
  status: string;
  data: { email: string };
};

export type TPartialFolder = Omit<Folder, "id" | "updatedAt" | "createdAt">;
