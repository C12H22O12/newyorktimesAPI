import React, { memo, useEffect, useState } from "react";
import { getAsync } from "@src/actions/modules/axios";

import Article from "@src/present/component/Article/Article";
import { ArticleType } from "@src/types/Article";
import Loading from "@src/present/layout/Loading/Loading";
import useInfinite from "@src/actions/hooks/useInfinite";
import { url } from "@src/constant/variable";

function Home() {
  const [articleList, setArticleList] = useState<Array<ArticleType | any>>([]);
  const [page, setPage] = useState<number>(1);
  const [moreData, setMoreDate] = useState<boolean>(true);

  const getData = async () => {
    await getAsync(`&page=${page}`).then((res) => {
      if (res.isSuccess) {
        setArticleList((prev) => prev.concat(...res.result.docs));
        setPage((prev) => {
          const next = prev + 1;

          return (next >= 5) ? 1 : next;
        });
        console.log(res.result);
      } else {
        setMoreDate(false);
      }
    });
  };

  const target = useInfinite(async (entry, observer) => {
    await getData();
  });

  const articles = articleList.map((elem, idx) => {
    return <Article key={idx} item={elem} />;
  });

  return (
    <div className="ArticleLayout">
      {articles} {moreData ? <div ref={target} /> : null}
    </div>
  );
}

export default memo(Home);
