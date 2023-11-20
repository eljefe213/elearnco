import { create } from "zustand";
export interface SearchStore {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  isOpen: false,
  action: "",
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
