import React, { memo, useEffect, useState } from "react";
import { getAsync } from "@src/actions/modules/axios";

import Article from "@src/present/component/Article/Article";
import { ArticleType } from "@src/types/Article";
import Loading from "@src/present/layout/Loading/Loading";

function Home() {
  const [articleList, setArticleList] = useState<Array<ArticleType | any>>([]);

  useEffect(() => {
    getAsync("").then((res) => {
      if (res.isSuccess) {
        setArticleList([...res.result.docs]);
        console.log(res.result);
      }
    });
  }, []);

  const articles = articleList.map((elem, idx) => {
    return <Article key={idx} item={elem} />;
  });

//   return <Loading />;

    return <div className="ArticleLayout">{articles}</div>;
}

export default memo(Home);
