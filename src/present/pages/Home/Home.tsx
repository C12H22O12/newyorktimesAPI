import React, { memo, useEffect, useState } from "react";

import Article from "@component/Article/Article";
import Loading from "@layout/Loading/Loading";
import ToastContainer from "@layout/ToastContainer/ToastContainer";
import { ToastType } from "@src/types/Toast";
import NoData from "@layout/NoData/NoData";
import useData from "@src/actions/hooks/useData";

function Home() {
  const [page, setPage] = useState<number>(1);
  const [toastOn, setToastOn] = useState<ToastType>({
    isToast: false,
    type: "",
    contentHeader: "",
    contentBody: "",
  });

  const { articleList, moreData, target } = useData({
    url: `&page=${page}`,
    setToastOn: setToastOn,
    setPage: setPage,
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
