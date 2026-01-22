import { create } from "zustand";
import blogData from '@/data/blogData.json';

interface StoreState {
  myLang: boolean;
  loading: boolean;
  changeLanguage: () => void;
  getLanguage: () => boolean;
  changeLoading: () => void;
  getLoading: () => boolean;
  myFocus: () => void;
  getLinkprincipal: () => string;
}

export const useStore = create<StoreState>((set, get) => ({
  // 🔹 Cargamos el idioma guardado (si existe)
  myLang:
    typeof window !== "undefined"
      ? localStorage.getItem("myLang") === "true"
      : false,

  loading: true,

  // 🔹 Cambiar idioma y refreshear la página
  changeLanguage: () => {
    const current = get().myLang;
    const newLang = !current;
    set({ myLang: newLang });

    if (typeof window !== "undefined") {
      localStorage.setItem("myLang", String(newLang)); // 🧠 guardamos
      window.location.reload(); // 🔁 recargamos la web
    }
  },

  getLanguage: () => get().myLang,

  changeLoading: () =>
    set((state) => ({ loading: !state.loading })),

  getLoading: () => get().loading,

  myFocus: () => {
    const username = document.getElementById("username") as HTMLInputElement;
    username?.focus();
  },
  getLinkprincipal: ()=> {
    const titlePrincipalLink = blogData[0].title;
    
    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .trim();
    };
    return generateSlug(titlePrincipalLink);
  }
}));
