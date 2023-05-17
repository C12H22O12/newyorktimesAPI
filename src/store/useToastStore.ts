import { create } from "zustand";

type success = string;

type error = string;

type toastType = {
  isToast: boolean;
  type: success | error;
  contentHeader: string;
  contentBody: string;
};

type useToastType = {
  toast: toastType;
  setToast: (obj: toastType) => void;
  closeToast: () => void;
};

export const useToastStore = create<useToastType>()((set) => ({
  toast: { isToast: false, type: "", contentHeader: "", contentBody: "" },
  setToast: (obj) => {
    set(() => ({ toast: { ...obj } }));
  },
  closeToast: () => {
    set((state) => ({ toast: { ...state.toast, isToast: false } }));
  },
}));
