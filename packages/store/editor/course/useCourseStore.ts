import { apiCreatePage, apiDeletePage, updateCourseFromApi } from "lib";
import { ERoutes } from "schemas";
import { toast } from "sonner";
import { create } from "zustand";
import { Course } from "database";
import { Page } from "database";

type Tpages = { pages: Page[] };
type CourseExtend = Course & Tpages;

interface State {
  course: CourseExtend;
  pages: Page[];
  isLoading: boolean;
  error: unknown;
  currentPage: number;
  totalPages: number;
  banner: string;
}

// Define the interface of the actions that can be performed in the Courses
interface Actions {
  fetchData: (numPage: number, id: string) => Promise<void>;
  updateBanner: (banner: string) => void;
  addPage: () => void;
  deletePage: (page: number) => void;
  updatePage: (page: number) => void;
  duplicatePage: (page: number) => void;
}

// Initialize a default state
const INITIAL_STATE: State = {
  course: {} as CourseExtend,
  pages: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  banner: "",
};

// Create the store with Zustand, combining the status interface and actions
export const useCourseStore = create<State & Actions>((set, get) => ({
  course: INITIAL_STATE.course,
  pages: INITIAL_STATE.pages,
  isLoading: INITIAL_STATE.isLoading,
  error: INITIAL_STATE.error,
  currentPage: INITIAL_STATE.currentPage,
  totalPages: INITIAL_STATE.totalPages,
  banner: INITIAL_STATE.banner,

  fetchData: async (numPage: number, id: string): Promise<void> => {
    try {
      set({ isLoading: true, error: null });
      const response = await fetch(
        `/api/${ERoutes.COURSE}/${id}?page=${numPage}`
      );
      const { data } = await response.json();

      set({
        course: data,
        isLoading: false,
        totalPages: data.pages.length,
        pages: data.pages,
        currentPage: numPage,
        banner: data.image,
      });
    } catch (error) {
      set({ error, isLoading: false });
    }
  },

  //NOTE -  we need to update the image course only if banner !==""
  updateBanner: async (banner) => {
    const currentIdCourse = get().course.id;
    await updateCourseFromApi({
      id: currentIdCourse,
      image: banner,
    });

    set((state) => ({
      ...state,
      banner,
    }));
  },

  addPage: async (): Promise<any> => {
    const id = get().course.id;
    const totalPage = get().totalPages;
    const pageData = JSON.stringify({
      course: { connect: { id: id } },
      index: totalPage,
    });
    try {
      const page = await apiCreatePage(pageData);
      const pages = [...get().course.pages]
      set((state) => ({ ...state, ...{pages:[...pages,page]}  }));
      toast.success("page created successfully !");
    
    } catch (error: any) {
      toast.error(error);
    }
  },

  updatePage: async (): Promise<void> => {},
  duplicatePage: async (): Promise<void> => {},

  deletePage: async (page): Promise<void> => {
    const pages = get().course.pages;
    const pageFinded = pages[page - 1];
    const pageFindedId = pageFinded.id;
    try {
      const pages = await apiDeletePage(pageFindedId);

      //set((state) => ({ ...state, ...{ ...pages } }));
      toast.success("page deleted successfully !");
    } catch (error) {
      toast.error("error");
    }
  },
}));
