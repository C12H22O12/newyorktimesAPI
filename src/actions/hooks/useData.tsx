import React, { useState, useCallback, useEffect } from "react";

import useInfinite from "@src/actions/hooks/useInfinite";
import { getAsync } from "@src/actions/modules/axios";
import { ErrorToast } from "@constant/toast";
import { useUrlStore } from "@store/useUrlStore";
import { useToastStore } from "@store/useToastStore";

function useData() {
  const { setToast } = useToastStore((state) => state);
  const { url, articleList, setArticleList } = useUrlStore(
    (state) => state
  );
  const [moreData, setMoreDate] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // getDate
  const getData = useCallback(async () => {
    
    await getAsync(url).then((res) => {
      if (res.isSuccess) {
        setIsLoading(true);
        console.log(url);
        setArticleList(articleList.concat(...res.result.docs));
      } else {
        setMoreDate(false);
        setToast({ ...ErrorToast });
      }

      setIsLoading(false);
    });
  }, [url]);

  useEffect(() => {
    getData();
  }, [url]);

  // Infinite scroll => observer and get new data
  const target = useInfinite(async (entry, observer) => {
    if (isLoading) return;
    console.log(isLoading, "로딩중이 아닌가요?");
    await getData();
  });

  return { moreData, target };
}

export default useData;
