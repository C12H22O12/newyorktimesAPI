import React, { useState, useCallback, useEffect } from "react";

import useInfinite from "@src/actions/hooks/useInfinite";
import { getAsync } from "@src/actions/modules/axios";
import { ErrorToast } from "@constant/toast";
import { useUrlStore } from "@store/useUrlStore";
import { useToastStore } from "@store/useToastStore";

function useData() {
  const { setToast } = useToastStore((state) => state);
  const { url, setInfiniteList, setInitPage, setFilterInfinite } = useUrlStore(
    (state) => state
  );
  const [moreData, setMoreDate] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isFilter =
    url.includes("&q") || url.includes("&fq") || url.includes("&begin_date")
      ? true
      : false;

  // getDate
  const getData = useCallback(async () => {
    setIsLoading(true);
    await getAsync(url).then((res) => {
      if (res.isSuccess) {
        if (isFilter) {
          setFilterInfinite(url, res.result.docs);
        } else {
          setInfiniteList(res.result.docs);
        }
      } else {
        setMoreDate(false);
        setToast({ ...ErrorToast });
        setInitPage();
      }
      setIsLoading(false);
    });
  }, [url]);

  // Infinite scroll => observer and get new data
  const target = useInfinite(getData);

  return { moreData, target, isLoading };
}

export default useData;
