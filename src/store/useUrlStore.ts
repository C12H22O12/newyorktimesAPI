import { ArticleType } from "@src/types/Article";
import { create } from "zustand";

type urlStoreType = {
  //   states
  articleList: Array<ArticleType>;
  page: number;
  url: string;

  //   ArticleList
  setArticleList: (list: Array<ArticleType>) => void;
  setInfiniteList: (list: Array<ArticleType>) => void;

  //   page
  setInitPage: () => void;

  //   URl
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

  setInfiniteList: (list) => {
    set((state) => ({
      articleList: [...state.articleList, ...list],
      page: (state.page + 1) % 5,
      url: `&page=${state.page}`
    }));
  },

  //   page
  setInitPage: () => {
    set(() => ({ page: 1 }));
  },

  //   URl
  setNextPage: () => {
    set((state) => ({ url: `&page=${state.page}` }));
  },

  setFilterUrl: (plusUrl) => {
    set(() => ({ url: plusUrl }));
  },
}));
