import { getFolders } from "lib/requests/folder";
import { filterFolderAlphabetic } from "lib/utils";
import { TFolder } from "schemas";
import { create } from "zustand";

// Define the interface of the Folders state
interface State {
  folders: TFolder[];
  totalFolders: number;
  isLoading: boolean;
  error: unknown;
}

// Define the interface of the actions that can be performed in the Folders
interface Actions {
  addFolder: (Item: TFolder) => void;
  removeFolder: (Item: TFolder) => void;
  fetchDataFolders: () => Promise<void>;
}

// Initialize a default state
const INITIAL_STATE: State = {
  folders: [],
  totalFolders: 0,
  isLoading: false,
  error: null,
};

// Create the store with Zustand, combining the status interface and actions
export const useFoldersStore = create<State & Actions>((set, get) => ({
  folders: INITIAL_STATE.folders,
  totalFolders: INITIAL_STATE.totalFolders,
  isLoading: INITIAL_STATE.isLoading,
  error: INITIAL_STATE.error,

  fetchDataFolders: async (): Promise<void> => {
    try {
      set({ isLoading: true, error: null });
      const folders = await getFolders();
      const data = folders;

      if (data) {
        set({
          folders: filterFolderAlphabetic(data),
          isLoading: false,
          totalFolders: data.length,
        });
      }
    } catch (error) {
      set({ error, isLoading: false });
    }
  },

  addFolder: (Folder: TFolder): void => {
    const folders = get().folders;
    folders.push(Folder);
    set((state) => ({
      folders: folders.reverse(),
      totalFolders: state.totalFolders + 1,
    }));
  },
  removeFolder: (Folder: TFolder): void => {
    set((state) => ({
      folders: state.folders.filter((item) => item.id !== Folder.id),
      totalFolders: state.totalFolders - 1,
    }));
  },
}));
