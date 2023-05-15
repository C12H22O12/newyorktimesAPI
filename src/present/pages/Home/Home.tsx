import React, { memo, useEffect, useState } from "react";
import { getAsync } from "@src/actions/modules/axios";

import Article from "@src/present/component/Article/Article";
import { ArticleType } from "@src/types/Article";
import Loading from "@src/present/layout/Loading/Loading";
import useInfinite from "@src/actions/hooks/useInfinite";
import ToastContainer from "@src/present/component/ToastContainer/ToastContainer";
import { ToastType } from "@src/types/Toast";

function Home() {
  const [articleList, setArticleList] = useState<Array<ArticleType | any>>([]);
  const [page, setPage] = useState<number>(1);
  const [moreData, setMoreDate] = useState<boolean>(true);
  const [toastOn, setToastOn] = useState<ToastType>({
    isToast: false,
    type: "",
    contentHeader: "",
    contentBody: "",
  });

  // getDate
  const getData = async () => {
    await getAsync(`&page=${page}`).then((res) => {
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
          contentBody: "에러가 발생했습니다. 잠시 후 다시 시도해주세요.",
        });
      }
    });
  };

  // Infinite scroll => observer and get new data
  const target = useInfinite(async (entry, observer) => {
    await getData();
  });

  // create Article Component by articleList
  const articles = articleList.map((elem, idx) => {
    return <Article key={idx} item={elem} />;
  });

  // ToastHandler
  const toastCloseHandler = () => {
    setToastOn((prev) => {
      return { ...prev, isToast: false };
    });
  };

  return (
    <div className="ArticleLayout">
      {toastOn.isToast && (
        <ToastContainer aboutToast={toastOn} closeHandler={toastCloseHandler} />
      )}
      {articles} {moreData ? <div ref={target} /> : null}
    </div>
  );
}

export default memo(Home);
