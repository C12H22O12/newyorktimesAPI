import React, { memo, useState } from "react";
import "./Navbar.style.css";

import { useNavigate } from "react-router-dom";

import { ReactComponent as Home } from "@assets/icon/home_icon.svg";
import { ReactComponent as Scrap } from "@assets/icon/scrap_icon.svg";

function Navbar() {
  const navigate = useNavigate();
  const [nowPage, setNowPage] = useState("home");

  const pageHandler = (e) => {
    setNowPage(e.target.value);
    navigate(`/${e.target.value}`)
  };

  return (
    <div id="Navbar">
      <input
        type="radio"
        name="navbar"
        value="home"
        id="home"
        checked={nowPage === "home"}
        onChange={pageHandler}
      />
      <label htmlFor="home" className="__navCompo">
        <Home />
        <div>홈</div>
      </label>
      <input
        type="radio"
        name="navbar"
        value="scrapscreen"
        id="scrapscreen"
        checked={nowPage === "scrapscreen"}
        onChange={pageHandler}
      />
      <label htmlFor="scrapscreen" className="__navCompo">
        <Scrap />
        <div>스크랩</div>
      </label>
    </div>
  );
}

export default memo(Navbar);
