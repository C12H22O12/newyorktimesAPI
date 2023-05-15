import React, { memo, useState } from "react";
import "./Article.style.css";

import { ArticleType } from "@src/types/Article";
import { ToastType } from "@src/types/Toast";

import Toast from "@component/Toast/Toast";

import StarBlank from "@assets/icon/star_blank.png";
import StarFill from "@assets/icon/star_fill.png";
import { ScrapToast, UnscrapToast } from "@src/constant/toast";

type ArticleProps = {
  item: ArticleType;
  setToastOn: React.Dispatch<React.SetStateAction<ToastType>>;
};

function Article({ item, setToastOn }: ArticleProps) {
  const [scrap, setScrap] = useState<boolean>(false);

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
    setScrap(!scrap);
    if (scrap) {
      setToastOn({ ...UnscrapToast });
    } else {
      setToastOn({ ...ScrapToast });
    }
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
