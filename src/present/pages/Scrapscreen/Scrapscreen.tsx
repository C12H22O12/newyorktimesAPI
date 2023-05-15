import React, { memo } from "react";
import { useScrapStore } from "@store/useScrapStore";

import NoData from "@src/present/layout/NoData/NoData";
import { useNavigate } from "react-router-dom";
import { ArticleType } from "@src/types/Article";
import Article from "@component/Article/Article";

function Scrapscreen({setToastOn}) {
  const navigate = useNavigate();
  const scraps = useScrapStore((state:any) => state.scraps);

  console.log(scraps);
  const noScraps = <div>저장된 스크랩이 없습니다.</div>;

  const moveHome = () => {
    navigate("/home");
  };

   // create Article Component by articleList
   const articles = scraps.map((elem, idx) => {
    return <Article key={idx} item={elem} setToastOn={setToastOn} />;
  });

  return (
    <div className="ArticleLayout">
      {/* Error 발생 시 NoData layout 보여주기 */}
      {scraps.length === 0 ? (
        <NoData
          type={"noScraps"}
          content={noScraps}
          buttonContent={"스크랩 하러 가기"}
          handler={moveHome}
        />
      ) : (
        <>{articles}</>
      )}
    </div>
  );
}

export default memo(Scrapscreen);
