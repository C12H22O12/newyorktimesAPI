import React from "react";
import "./NoData.style.css";

import NoDataImg from "@assets/icon/noData.png";
import Button from "@src/present/common/Button/Button";

type NoDataProps = {
  type: string;
  content: JSX.Element;
  buttonContent?: string;
  handler?: any;
};

function NoData({ type, content, buttonContent, handler }: NoDataProps) {
  return (
    <div className="noData">
      <div>
        <img src={NoDataImg} alt={"No data"} />
        {content}
      </div>

      {type !== "filter" && (
        <Button content={buttonContent} handler={handler} />
      )}
    </div>
  );
}

export default NoData;
