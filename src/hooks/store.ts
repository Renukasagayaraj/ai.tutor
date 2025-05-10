import { create } from "zustand";

interface ChatState {
  question: string;
  loading: boolean;
  error: boolean;
  setLoading: (state: boolean) => void;
  setQuestion: (question: string) => void;
  setError: (state: boolean) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  question: "",
  loading: false,
  error: false,
  setQuestion: (question: string) => set({ question: question }),
  setLoading: (state: boolean) => set({ loading: state }),
  setError: (state: boolean) => set({ error: state }),
}));
