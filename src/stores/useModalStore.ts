import { create } from "zustand";
import { ReactNode } from "react";

interface ModalState {
  isOpen: boolean;
  type: "delete" | "edit" | "add";
  title: string;
  content: ReactNode;
  confirmText: string;
  onConfirm: () => void;
}

interface ModalActions {
  openModal: (
    type: "delete" | "edit" | "add",
    title: string,
    content: ReactNode,
    confirmText: string,
    onConfirm: () => void
  ) => void;
  closeModal: () => void;
}

type ModalStore = ModalState & ModalActions;

const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  type: "delete",
  title: "",
  content: "",
  confirmText: "",
  onConfirm: () => {},

  openModal: (type, title, content, confirmText, onConfirm) => {
    set({ isOpen: true, type, title, content, confirmText, onConfirm });
  },

  closeModal: () => {
    set({
      isOpen: false,
      type: "delete",
      title: "",
      content: "",
      confirmText: "",
      onConfirm: () => {},
    });
  },
}));

export default useModalStore;
