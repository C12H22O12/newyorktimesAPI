import { nationList } from "@src/constant/lists";
import { ArticleType } from "@src/types/Article";

export const returnName = (arr) => {
  arr.sort();
  let represent = "";

  for (const i of nationList) {
    if (i.value === arr[0]) {
      represent = i.country;
    }
  }

  return arr.length > 1 ? `${represent} 외 ${arr.length - 1}개` : represent;
};

export const removeDuplicate = (arr): Array<ArticleType> => {
  // 'uri'를 기준으로 중복 확인
  const uriSet = new Set(arr.map(item => item.uri));

  // 중복된 'uri'를 가진 항목을 제거
  const uniqueArr = Array.from(uriSet).map(uri => {
    return arr.find(item => item.uri === uri);
  });

  return uniqueArr;
};
