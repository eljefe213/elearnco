import { ERoutes } from "schemas";
import { TotalCourse } from "schemas/courses";
import { CourseDate, CourseStatus, CourseTitle } from "schemas/menus/dropdown";
import { create } from "zustand";

interface State {
  courses: TotalCourse[];
  totalCourses: number;
  isLoading: boolean;
  error: unknown;
  currentPage: number;
  status: CourseStatus;
  order: CourseTitle;
  folder: string;
}

interface Actions {
  addCourse: (Item: TotalCourse) => void;
  updateCourse: (courseID: string, data: Partial<TotalCourse>) => void;
  deleteCourse: (courseID: string) => void;
  fetchData: (
    numPage: number,
    status: CourseStatus,
    order: CourseTitle,
    folder: string,
    date: CourseDate
  ) => Promise<void>;
}

const INITIAL_STATE: State = {
  courses: [],
  totalCourses: 0,
  isLoading: false,
  error: null,
  currentPage: 1,
  status: CourseStatus.DRAFT,
  order: CourseTitle.AZ,
  folder: "all",
};

export const useCoursesStore = create<State & Actions>((set, get) => ({
  courses: INITIAL_STATE.courses,
  totalCourses: INITIAL_STATE.totalCourses,
  isLoading: INITIAL_STATE.isLoading,
  error: INITIAL_STATE.error,
  currentPage: INITIAL_STATE.currentPage,
  status: INITIAL_STATE.status,
  order: INITIAL_STATE.order,
  folder: INITIAL_STATE.folder,

  fetchData: async (
    numPage: number,
    status: string,
    order: string,
    folder: string,
    date: string
  ): Promise<void> => {
    try {
      set({ isLoading: true, error: null });

      const response = await fetch(
        `/api/${ERoutes.COURSES}?page=${numPage}&status=${status}&folder=${folder}&date=${date}&order=${order}`
      );
      const { data } = await response.json();

      set({
        courses: data[0],
        isLoading: false,
        totalCourses: data[1] || data[0].length,
        order: (order as CourseTitle) || CourseTitle.AZ,
        status: (status as CourseStatus) || CourseStatus.DRAFT,
        folder: folder || "all",
      });
    } catch (error) {
      set({ error, isLoading: false });
    }
  },

  addCourse: (course: TotalCourse): void => {
    set((state) => ({
      courses: [...state.courses, course],
      //.sort((a,b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)),
      totalCourses: state.totalCourses + 1,
    }));
  },

  updateCourse: (courseID: string, data: Partial<TotalCourse>): void => {
    const courses = get().courses;
    const status = get().status;
    const updateCourse = courses.map((course) =>
      course.id === courseID ? { ...course, ...data } : course
    );

    const newStore = updateCourse.filter((course) => course.status === status);

    set(() => ({
      courses: newStore,
      totalCourses: newStore.length,
    }));
  },

  deleteCourse: (courseID: string): void => {
    set((state) => ({
      courses: state.courses.filter((item) => item.id !== courseID),
      totalCourses: state.totalCourses - 1,
    }));
  },
}));
