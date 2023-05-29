import { create } from "zustand";

export type ShowSheetProps = {
  showSheet: boolean;
  setShowSheet: (showSheet: boolean) => void;
};

export const useShowSheet = create<ShowSheetProps>((set) => ({
  showSheet: false,
  setShowSheet: (state: boolean) => set({ showSheet: state }),
}));
