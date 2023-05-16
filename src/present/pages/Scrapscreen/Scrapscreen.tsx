import React, { memo, useEffect } from "react";
import { useScrapStore } from "@store/useScrapStore";

import NoData from "@src/present/layout/NoData/NoData";
import { useNavigate } from "react-router-dom";
import Article from "@component/Article/Article";
import { removeDuplicate } from "@src/actions/modules/dummy";

function Scrapscreen() {
  const navigate = useNavigate();
  const { scraps, setScraps } = useScrapStore((state: any) => state)

  useEffect(() => {
    const scrapsLocal = localStorage.getItem("scraps");
    setScraps(JSON.parse(scrapsLocal));
  }, []);

  //   check No Scrap
  const noscrapCheck = scraps.length === 0 ? true : false;
  const noScraps = <div>저장된 스크랩이 없습니다.</div>;

  const moveHome = () => {
    navigate("/home");
  };

  console.log(scraps)

  // create Article Component by scraps
  const articles = removeDuplicate(scraps).map((elem, idx) => {
    return <Article key={idx} item={elem}  />;
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
