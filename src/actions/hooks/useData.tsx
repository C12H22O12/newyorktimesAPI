import React, { useState, useCallback, useEffect } from "react";

import useInfinite from "@src/actions/hooks/useInfinite";
import { getAsync } from "@src/actions/modules/axios";
import { ErrorToast } from "@constant/toast";
import { useUrlStore } from "@store/useUrlStore";
import { useToastStore } from "@store/useToastStore";

function useData() {
  const { setToast } = useToastStore((state) => state);
  const { url, setInfiniteList, setInitPage } = useUrlStore((state) => state);
  const [moreData, setMoreDate] = useState<boolean>(true);

  // getDate
  const getData = useCallback(async () => {
    await getAsync(url).then((res) => {
      if (res.isSuccess) {
        setInfiniteList(res.result.docs);
      } else {
        setMoreDate(false);
        setToast({ ...ErrorToast });
        setInitPage();
      }
    });
  }, [url]);

  // Infinite scroll => observer and get new data
  const target = useInfinite(getData);

  return { moreData, target };
}

export default useData;
