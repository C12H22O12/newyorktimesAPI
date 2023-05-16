import React, { useState, useCallback } from "react";
import { ToastType } from "@src/types/Toast";

import useInfinite from "@src/actions/hooks/useInfinite";
import { getAsync } from "@src/actions/modules/axios";
import { ArticleType } from "@src/types/Article";
import { ErrorToast } from "@src/constant/toast";

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
        setToastOn({...ErrorToast});
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
