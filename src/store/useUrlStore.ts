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
  setPage: (number: number) => void;
  setInitPage: () => void;

  //   URl
  setDefaultUrl: () => void;
  setFilterUrl: (plusUrl: string) => void;
};

export const useUrlStore = create<urlStoreType>()((set) => ({
  //   states
  articleList: [],
  page: 0,
  url: "",

  //   ArticleList
  setArticleList: (list) => {
    set(() => ({ articleList: [...list] }));
  },

  setInfiniteList: (list) => {
    set((state) => ({
      articleList: [...state.articleList, ...list],
      page: (state.page + 1) % 5,
    }));
  },

  //   page
  setPage: (number) => {
    set(() => ({ page: number }));
  },

  setInitPage: () => {
    set(() => ({ page: 0 }));
  },

  //   URl
  setDefaultUrl: () => {
    set(() => ({ url: `&page=${0}` }));
  },

  setNextPage: () => {
    set((state) => ({ url: `&page=${state.page}` }));
  },

  setFilterUrl: (plusUrl) => {
    set(() => ({ url: plusUrl }));
  },
}));
