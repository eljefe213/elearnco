import { create } from "zustand";

export interface LoadingStore {
  isLoading: boolean;
  onStopLoading: () => void;
  onBeginLoading: () => void;
}

export const useLoadingStore = create<LoadingStore>((set) => ({
  isLoading: false,
  onStopLoading: () => set({ isLoading: false }),
  onBeginLoading: () => set({ isLoading: true }),
}));
