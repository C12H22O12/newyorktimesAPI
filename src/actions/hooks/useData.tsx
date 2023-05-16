import React, { useState, useCallback, useEffect } from "react";
import { ToastType } from "@src/types/Toast";

import useInfinite from "@src/actions/hooks/useInfinite";
import { getAsync } from "@src/actions/modules/axios";
import { ArticleType } from "@src/types/Article";
import { ErrorToast } from "@src/constant/toast";
import { useUrlStore } from "@src/store/useUrlStore";

type useDataProps = {
  url: string;
  setToastOn: React.Dispatch<React.SetStateAction<ToastType>>;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  setArticleList: React.Dispatch<React.SetStateAction<Array<ArticleType>>>;
};

function useData({ setToastOn }: useDataProps) {
  const { url, articleList, page, setPage, setArticleList } = useUrlStore(
    (state) => state
  );
  const [moreData, setMoreDate] = useState<boolean>(true);

  // apply filter
  useEffect(() => {
    if (
      url.includes("&q") ||
      url.includes("&begin_date") ||
      url.includes("&fq")
    ) {
      setArticleList([])
      getData();
    }
  }, [url]);

  // getDate
  const getData = useCallback(async () => {
    await getAsync(url).then((res) => {
      if (res.isSuccess) {
        setArticleList(articleList.concat(...res.result.docs));
        setPage((page + 1) % 5);
      } else {
        setMoreDate(false);
        setToastOn({ ...ErrorToast });
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
