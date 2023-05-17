import { ArticleType } from "@src/types/Article";
import { create } from "zustand";

type urlStoreType = {
  //   states
  articleList: Array<ArticleType>;
  page: number;
  url: string;

  //   ArticleList
  setArticleList: (list: Array<ArticleType>) => void;
  setInitArticleList: () => void;
  setInfiniteList: (list: Array<ArticleType>) => void;

  //   page
  setInitPage: () => void;

  //   URl
  setFilterUrl: (plusUrl: string) => void;
  setFilterInfinite: (plusUrl: string, list: Array<ArticleType>) => void;
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

  setInitArticleList: () => {
    set(() => ({ articleList: [] }));
  },

  setInfiniteList: (list) => {
    set((state) => ({
      articleList: [...state.articleList, ...list],
      page: state.page + 1,
      url: `&page=${state.page}`,
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

  setFilterInfinite: (plusUrl, list) => {
    set((state) => ({
      articleList: [...state.articleList, ...list],
      page: state.page + 1,
      url: `${plusUrl}&page=${state.page}`,
    }));
  },
}));
