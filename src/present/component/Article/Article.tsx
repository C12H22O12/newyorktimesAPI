import React, { memo } from "react";
import "./Article.css";

import { ArticleType } from "@src/types/Article";
import StarBlank from "@assets/icon/star_blank.png"
import StarFill from "@assets/icon/star_fill.png"

type ArticleProps = {
  item: ArticleType;
};

function Article({ item }: ArticleProps) {
  // Date
  const publicDate = item.pub_date.slice(0, 10);
  const weekDayIdx = new Date(publicDate).getDay();
  const weekDayArr = ["일", "월", "화", "수", "목", "금", "토"];

  const printDate = `${publicDate.split("-").join(".")} (${
    weekDayArr[weekDayIdx]
  })`;

  return (
    <div className="Article">
      <div className="__headline">
        <div>{item.headline.main}</div>
        <img src={StarBlank} alt={"scrap"} />
      </div>
      <div className="__footer">
        <div>
          {item.source} &nbsp; {item.subsection_name}
        </div>
        <div>{printDate}</div>
      </div>
    </div>
  );
}

export default memo(Article);
