import React, { useState, useCallback } from "react";
import { ToastType } from "@src/types/Toast";

import useInfinite from "@src/actions/hooks/useInfinite";
import { getAsync } from "@src/actions/modules/axios";
import { ArticleType } from "@src/types/Article";

type useDataProps = {
  url: string;
  setToastOn: React.Dispatch<React.SetStateAction<ToastType>>;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  setArticleList: React.Dispatch<React.SetStateAction<Array<ArticleType>>>;
};

function useData({ url = "", setToastOn, setPage, setArticleList }: useDataProps) {
  const [moreData, setMoreDate] = useState<boolean>(true);

  // getDate
  const getData = useCallback(async () => {
    console.log(url)
    await getAsync(url).then((res) => {
      if (res.isSuccess) {
        setArticleList((prev) => prev.concat(...res.result.docs));
        setPage((prev) => {
          const next = prev + 1;
          return next >= 5 ? 1 : next;
        });
      } else {
        setMoreDate(false);
        setToastOn({
          isToast: true,
          type: "error",
          contentHeader: "Error",
          contentBody: `데이터를 불러올 수 없습니다.`,
        });
      }
    });
  }, [url]);

  // Infinite scroll => observer and get new data
  const target = useInfinite(async (entry, observer) => {
    await getData();
  });

  return { moreData, target };
}

export default useData;
