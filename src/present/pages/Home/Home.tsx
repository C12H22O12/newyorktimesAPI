import React, { memo, useEffect, useState } from "react";
import { getAsync } from "@src/actions/modules/axios";

import Article from "@src/present/component/Article/Article";
import { ArticleType } from "@src/types/Article";
import Loading from "@src/present/layout/Loading/Loading";
import useInfinite from "@src/actions/hooks/useInfinite";
import ToastContainer from "@src/present/layout/ToastContainer/ToastContainer";
import { ToastType } from "@src/types/Toast";
import NoData from "@src/present/layout/NoData/NoData";

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
          contentBody: `데이터를 불러올 수 없습니다.`,
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

  // reloadHandler
  const reloadHandler = () => {
    location.reload();
  };

  const noDataText = (
    <div>
      오류가 발생했습니다.
      <br />
      잠시 후 새로고침 해주세요
    </div>
  );

  return (
    <div className="ArticleLayout">
      {/* Toast 생성 */}
      {toastOn.isToast && (
        <ToastContainer aboutToast={toastOn} closeHandler={toastCloseHandler} />
      )}

      {/* Error 발생 시 NoData layout 보여주기 */}
      {toastOn.type === "error" ? (
        <NoData
          type={"noData"}
          content={noDataText}
          buttonContent={"새로고침 하기"}
          handler={reloadHandler}
        />
      ) : (
        <>
          {articles} {moreData ? <div ref={target} /> : null}
        </>
      )}
    </div>
  );
}

export default memo(Home);
