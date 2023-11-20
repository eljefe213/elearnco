import { create } from "zustand";

export interface DisabledStore {
  isDisabled: boolean;
  onStopDisabled: () => void;
  onBeginDisabled: () => void;
}

export const useDisabledStore = create<DisabledStore>((set) => ({
  isDisabled: true,
  onStopDisabled: () => set({ isDisabled: false }),
  onBeginDisabled: () => set({ isDisabled: true }),
}));
