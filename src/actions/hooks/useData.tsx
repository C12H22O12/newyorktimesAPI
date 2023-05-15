import React, { useState, useCallback } from "react";
import { ArticleType } from "@src/types/Article";
import { ToastType } from "@src/types/Toast";

import useInfinite from "@src/actions/hooks/useInfinite";
import { getAsync } from "@src/actions/modules/axios";

type useDataProps = {
  url: string;
  setToastOn: React.Dispatch<React.SetStateAction<ToastType>>;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
};

function useData({ url = "", setToastOn, setPage }: useDataProps) {
  const [articleList, setArticleList] = useState<Array<ArticleType | any>>([]);
  const [moreData, setMoreDate] = useState<boolean>(true);

  // getDate
  const getData = useCallback(async () => {
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

  return { articleList, moreData, target };
}

export default useData;
