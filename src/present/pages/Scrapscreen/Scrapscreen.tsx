import React, { memo, useEffect } from "react";
import { useScrapStore } from "@store/useScrapStore";

import NoData from "@src/present/layout/NoData/NoData";
import { useNavigate } from "react-router-dom";
import Article from "@component/Article/Article";
import { removeDuplicate } from "@src/actions/modules/scrap";

function Scrapscreen() {
  const navigate = useNavigate();
  const { filteredScraps } = useScrapStore(
    (state: any) => state
  );

  console.log(filteredScraps)

  //   check No Scrap
  const noscrapCheck = filteredScraps.length === 0 ? true : false;
  const noScraps = <div>저장된 스크랩이 없습니다.</div>;

  const moveHome = () => {
    navigate("/home");
  };

  // create Article Component by scraps
  const articles = removeDuplicate(filteredScraps).map((elem, idx) => {
    return <Article key={idx} item={elem} />;
  });

  return (
    <div className={`ArticleLayout ${!noscrapCheck && "scrapExist"}`}>
      {/* Error 발생 시 NoData layout 보여주기 */}
      {noscrapCheck ? (
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
