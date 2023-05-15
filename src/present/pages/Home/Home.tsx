import React, { memo, useEffect, useState } from "react";

import Article from "@component/Article/Article";
import Loading from "@layout/Loading/Loading";
import ToastContainer from "@layout/ToastContainer/ToastContainer";

import NoData from "@layout/NoData/NoData";
import { ArticleType } from "@src/types/Article";
import { ToastType } from "@src/types/Toast";

type HomeProps = {
  articleList: Array<ArticleType>;
  toastOn: ToastType;
  toastCloseHandler: any;
  moreData: boolean;
  target: React.MutableRefObject<any>;
};

function Home({
  articleList,
  toastOn,
  toastCloseHandler,
  moreData,
  target,
}: HomeProps) {
  // create Article Component by articleList
  const articles = articleList.map((elem, idx) => {
    return <Article key={idx} item={elem} />;
  });

  // reloadHandler for Error
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
