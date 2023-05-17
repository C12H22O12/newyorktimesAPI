import React, { memo, useEffect, useRef, useState } from "react";
import "./Article.style.css";

import { ArticleType } from "@src/types/Article";

import StarBlank from "@assets/icon/star_blank.png";
import StarFill from "@assets/icon/star_fill.png";
import { ScrapToast, UnscrapToast } from "@src/constant/toast";
import { useScrapStore } from "@src/store/useScrapStore";
import { useLocation } from "react-router-dom";
import { useToastStore } from "@src/store/useToastStore";
import { checkArrayIn, removeDuplicate } from "@src/actions/modules/scrap";

type ArticleProps = {
  item: ArticleType;
};

function Article({ item }: ArticleProps) {
  const location = useLocation().pathname;
  const { setToast } = useToastStore((state) => state);
  const { scraps, addScraps, subScraps } = useScrapStore((state) => state);
  const [scrap, setScrap] = useState<boolean>(false);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (location === "/scrapscreen") setScrap(true);

    if (checkArrayIn(scraps, item.uri)) {
      setScrap(true);
    } else {
      setScrap(false);
    }
  }, [location]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      localStorage.setItem("scraps", JSON.stringify(removeDuplicate(scraps)));
    }
  }, [scrap]);

  // Date
  const publicDate = item.pub_date.slice(0, 10);
  const weekDayIdx = new Date(publicDate).getDay();
  const weekDayArr = ["일", "월", "화", "수", "목", "금", "토"];

  const printDate = `${publicDate.split("-").join(".")} (${
    weekDayArr[weekDayIdx]
  })`;

  // moveHandler
  const moveHandler = () => {
    window.location.href = item.web_url;
  };

  // scrapHandler
  const scrapHandler = (e) => {
    e.stopPropagation(); //Stop Event Bubbling
    if (scrap) {
      subScraps(item);
      setToast({ ...UnscrapToast });
    } else {
      addScraps(item);
      setToast({ ...ScrapToast });
    }
    setScrap(!scrap);
  };

  return (
    <div className="Article" onClick={moveHandler}>
      <div className="__headline">
        <div>{item.headline.main}</div>
        {scrap ? (
          <img src={StarFill} alt={"scrap"} onClick={scrapHandler} />
        ) : (
          <img src={StarBlank} alt={"scrap"} onClick={scrapHandler} />
        )}
      </div>
      <div className="__footer">
        <div>
          {item.source} &nbsp;{" "}
          {item.byline.person[0] !== undefined &&
            item.byline.person[0].lastname}
        </div>
        <div>{printDate}</div>
      </div>
    </div>
  );
}

export default memo(Article);
