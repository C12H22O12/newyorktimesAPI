import React, { memo, useEffect, useState } from "react";

import Article from "@component/Article/Article";
import Loading from "@layout/Loading/Loading";
import ToastContainer from "@layout/ToastContainer/ToastContainer";

import useData from "@src/actions/hooks/useData";

import NoData from "@layout/NoData/NoData";
import { useDataTypes } from "@src/types/Article";
import { useUrlStore } from "@store/useUrlStore";
import { ToastType } from "@src/types/Toast";

type HomeProps = {
  toastOn: ToastType;
  setToastOn: React.Dispatch<React.SetStateAction<ToastType>>;
};

function Home({ toastOn, setToastOn }: HomeProps) {
  const { url, page, setPage, articleList, setArticleList, setDefaultUrl } =
    useUrlStore((state) => state);

  // create Article Component by articleList
  const articles = articleList.map((elem, idx) => {
    return <Article key={idx} item={elem} setToastOn={setToastOn} />;
  });

  // reloadHandler for Error
  const reloadHandler = () => {
    location.reload();
  };

  useEffect(() => {
    setDefaultUrl();
  }, [page]);

  useEffect(() => {
    if ("q".includes(url)) {
      setArticleList([]);
      setPage(1);
    }
  }, [url]);

  console.log(url)

  // get Article List
  const { moreData, target }: useDataTypes = useData({
    url: url,
    setToastOn: setToastOn,
    setPage: setPage,
    setArticleList: setArticleList,
  });

  // ToastHandler
  const toastCloseHandler = (): void => {
    setToastOn((prev) => {
      return { ...prev, isToast: false };
    });
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
      {articleList.length === 0 ? <Loading /> : null}

      {/* Toast 생성 */}
      {toastOn.isToast && (
        <ToastContainer aboutToast={toastOn} closeHandler={toastCloseHandler} />
      )}

      {/* Error 발생 시 NoData layout 보여주기 */}
      {articleList.length !== 0 && toastOn.type === "error" ? (
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
