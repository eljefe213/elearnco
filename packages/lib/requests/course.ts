import { Course } from "@prisma/client";
import { toast } from "sonner";
import {
  apiCreateCourse,
  apiDeleteCourse,
  apiGetCourse,
  apiGetCourses,
  apiGetMoreRecentCourse,
  apiUpdateCourse,
} from "./api.request";

export const pathApiCourses = "/api/courses";
export const pathApiCourse = "/api/course";


/**
 * Get All user courses
 * @returns Course[] | null
 */
export const getCoursesFromApi = async (): Promise<Course[] | null> => {
  const res = await apiGetCourses();

  if (res.status === "success") {
    return res.data as unknown as Course[];
  } else {
    toast.error(res as unknown as string);
    return null;
  }
};
/**
 * Get a user course
 * @returns Course | null
 */
export const getCourseFromApi = async (id: string): Promise<Course | null> => {
  const res = await apiGetCourse(id);

  if (res.status === "success") {
    return res.data as unknown as Course;
  } else {
    toast.error(res as unknown as string);
    return null;
  }
};
/**
 * Get a user course more recent
 * @returns Course | null
 */
export const getCourseMoreRecentFromApi = async (): Promise<Course | null> => {
  const res = await apiGetMoreRecentCourse();
  if (res.status === "success") {
    return res.data as unknown as Course;
  } else {
    toast.error(res as unknown as string);
    return null;
  }
};
/**
 * Create a course
 * @param editObjCourse <Omit<Course, 'id' | 'updatedAt' | 'createdAt'>>
 * @returns
 */
export const createCourseFromApi = async (
  editObjCourse: any
): Promise<Course | null> => {
  const res = await apiCreateCourse(editObjCourse);

  if (res.status === "success") {
    toast.success("Course created successfully!");
    return res.data as unknown as Course;
  } else {
    toast.error(res as unknown as string);
    return null;
  }
};
/**
 * Update a course
 * @param editObjCourse <Omit<Course, 'id' | 'updatedAt' | 'createdAt'>>
 * @returns
 */
export const updateCourseFromApi = async (
  editObjCourse: Partial<Course>
): Promise<Course | null> => {
  const { id, ...rest } = editObjCourse;
  const res = await apiUpdateCourse(editObjCourse.id as string, rest);

  if (res.status === "success") {
    toast.success("Course updated successfully!");
    return res.data as unknown as Course;
  } else {
    toast.error(res as unknown as string);
    return null;
  }
};

/**
 * Delete a course
 * @param id
 * @returns Course | null
 */
export const deleteCourseFromApi = async (
  id: string
): Promise<Course | null> => {
  const res = await apiDeleteCourse(id);
  if (res.status === "success") {
    toast.success("Course deleted successfully!");
    return res.data as unknown as Course;
  } else {
    toast.error(res as unknown as string);
    return null;
  }
};
