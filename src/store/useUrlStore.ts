import { ArticleType } from "@src/types/Article";
import { create } from "zustand";
import { url } from "@constant/variable";

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
  setFilterUrl: (plusUrl) => {
    set(() => ({ url: plusUrl }));
  },

  setFilterInfinite: (plusUrl, list) => {
    const urlObj = new URL(`${url}${plusUrl}`);
    const params = new URLSearchParams(urlObj.search);

    params.delete('page');
    urlObj.search = params.toString();

    const newPlusUrl = urlObj.toString().substring(url.length)

    set((state) => ({
      articleList: [...state.articleList, ...list],
      page: state.page + 1,
      url: `${newPlusUrl}&page=${state.page}`,
    }));
  },
}));
