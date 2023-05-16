import { ArticleType } from "@src/types/Article";
import { create } from "zustand";

type urlStoreType = {
  //   states
  articleList: Array<ArticleType>;
  page: number;
  url: string;

  //   ArticleList
  setArticleList: (list: Array<ArticleType>) => void;

  //   page
  setPage: (number: number) => void;

  //   URl
  setDefaultUrl: () => void;
  setFilterUrl: (plusUrl: string) => void;
};

export const useUrlStore = create<urlStoreType>()((set) => ({
  //   states
  articleList: [],
  page: 1,
  url: "",

  //   ArticleList
  setArticleList: (list) => {
    set(() => ({ articleList: [...list] }));
  },

  //   page
  setPage: (number) => {
    set(() => ({ page: number }));
  },

  //   URl
  setDefaultUrl: () => {
    set((state) => ({ url: `&page=${state.page}` }));
  },
  setFilterUrl: (plusUrl) => {
    set(() => ({ url: plusUrl }));
  },
}));
