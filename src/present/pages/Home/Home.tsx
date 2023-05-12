import { getAsync } from "@src/actions/modules/axios";
import React, { memo, useEffect, useState } from "react";

function Home() {
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    getAsync("").then((res) => {
        if (res.isSuccess){
            setArticleList([...res.result.docs])
            console.log(res.result);
        }
    });
  }, []);

  console.log(articleList)

  return <div>home</div>;
}

export default memo(Home);
