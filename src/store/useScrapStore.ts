import { ArticleType } from "@src/types/Article";
import { FilterType } from "@src/types/Filter";
import { format } from "date-fns";
import { create } from "zustand";

type scrapStoreType = {
  scraps: Array<ArticleType>;
  filteredScraps: Array<ArticleType>;
  setScraps: (lst: any) => void;
  addScraps: (item: ArticleType) => void;
  subScraps: (item: ArticleType) => void;
  initFilteredScraps: () => void;
  filterScraps: (query: FilterType) => void;
};

export const useScrapStore = create<scrapStoreType>()((set) => ({
  scraps: [],
  filteredScraps: [],
  setScraps: (lst) => {
    set(() => ({ scraps: [...lst] }));
  },
  addScraps: (item: ArticleType) => {
    set((state) => ({
      scraps: [...state.scraps, item],
    }));
  },
  subScraps: (item: ArticleType) => {
    set((state) => ({
      scraps: state.scraps.filter((elem) => {
        return elem.uri !== item.uri;
      }),
    }));
  },
  initFilteredScraps: () => {
    set((state) => ({ filteredScraps: state.scraps }));
  },
  filterScraps: (query: FilterType) => {
    set((state) => ({
      filteredScraps: state.scraps.filter((elem) => {
        // check headline
        const checkHeadline = elem.headline.main.includes(query.headLine);

        // check date
        let pubDate, queryDate;
        let checkDate = true;
        if (query.date !== null) {
          pubDate = format(new Date(elem.pub_date), "yyyyMMdd");
          queryDate = format(query.date, "yyyyMMdd");
          checkDate = pubDate === queryDate;
        }

        // check country
        let checkCountry = true;

        if (query.country.length > 0) {
          const countryScraps = elem.keywords.filter((item) => {
            return item.name === "glocations";
          });
          
          checkCountry =
            countryScraps.length > 0 &&
            query.country.includes(countryScraps[0].value);
        }

        return checkHeadline && checkDate && checkCountry;
      }),
    }));
  },
}));
