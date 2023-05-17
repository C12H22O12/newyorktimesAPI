import { ArticleType } from "@src/types/Article";

type scrapProps = Array<ArticleType>;

export const removeDuplicate = (arr: scrapProps): scrapProps => {
  const uriSet = new Set(arr.map((item) => item.uri));

  const uniqueArr = Array.from(uriSet).map((uri) => {
    return arr.find((item) => item.uri === uri);
  });

  return uniqueArr;
};

export const checkArrayIn = (arr: scrapProps, value: string): boolean => {
  for (const i of arr) {
    if (i.uri === value) return true;
  }

  return false;
};
