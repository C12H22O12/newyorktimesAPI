import React, { memo, useEffect, useState, useMemo } from "react";

import Article from "@component/Article/Article";
import Loading from "@layout/Loading/Loading";
import ToastContainer from "@layout/ToastContainer/ToastContainer";

import useData from "@src/actions/hooks/useData";

import NoData from "@layout/NoData/NoData";
import { useDataTypes } from "@src/types/Article";
import { useUrlStore } from "@store/useUrlStore";
import { useToastStore } from "@store/useToastStore";

function Home() {
  const { articleList, setInitPage } = useUrlStore((state) => state);
  const { toast } = useToastStore((state) => state);

  useEffect(() => {
    setInitPage();
  }, []);

  // Article Component
  const list = useMemo(() => {
    return articleList.map((elem, idx) => {
      return <Article key={idx} item={elem} />;
    });
  }, [articleList]);

  // reloadHandler for Error
  const reloadHandler = () => {
    location.reload();
  };

  // get Article List
  const { moreData, target, isLoading }: useDataTypes = useData();

  const noDataText = (
    <div>
      오류가 발생했습니다.
      <br />
      잠시 후 새로고침 해주세요
    </div>
  );

  return (
    <div className="ArticleLayout">
      {isLoading ? <Loading /> : null}

      {/* Toast 생성 */}
      {toast.isToast && <ToastContainer />}

      {/* Error 발생 시 NoData layout 보여주기 */}
      {articleList.length !== 0 && toast.type === "error" ? (
        <NoData
          type={"noData"}
          content={noDataText}
          buttonContent={"새로고침 하기"}
          handler={reloadHandler}
        />
      ) : (
        <>
          {list}
          {moreData && (
            <div ref={target} className="beforeInfinite">
              Loading...
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default memo(Home);
