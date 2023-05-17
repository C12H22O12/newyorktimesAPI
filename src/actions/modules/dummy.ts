import { nationList } from "@constant/lists";

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