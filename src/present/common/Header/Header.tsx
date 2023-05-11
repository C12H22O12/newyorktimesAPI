import React, { memo } from "react";
import "./Header.css";

import { ReactComponent as Search } from "../../../assets/icon/search_icon.svg";
import { ReactComponent as Calendar } from "../../../assets/icon/calendar_icon.svg";

function Header() {
  const content = [
    { svg: <Search />, content: "전체 헤드라인" },
    { svg: <Calendar />, content: "전체 날짜" },
    { svg: null, content: "전체 국가" },
  ];

  const headerCompos = content.map((elem, idx) => {
    return (
      <div className="HeaderCompo" key={idx}>
        {elem.svg}
        <div>{elem.content}</div>
      </div>
    );
  });

  return <div className="Header">{headerCompos}</div>;
}

export default memo(Header);
