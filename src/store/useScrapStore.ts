import { ArticleType } from "@src/types/Article";
import { create } from "zustand";

type scrapStoreType = {
  scraps: Array<ArticleType>;
  setScraps: () => void;
  addScraps: (item: ArticleType) => void;
  subScraps: (item: ArticleType) => void;
};

export const useScrapStore = create<scrapStoreType>()((set) => ({
  scraps: [],
  setScraps: () => {
    localStorage.getItem("scraps");
  },
  addScraps: (item: ArticleType) => {
    set((state) => ({ scraps: [...state.scraps, item] }));
  },
  subScraps: (item: ArticleType) => {
    set((state) => ({
      scraps: state.scraps.filter((elem) => {
        return elem.headline !== item.headline;
      }),
    }));
  },
}));
