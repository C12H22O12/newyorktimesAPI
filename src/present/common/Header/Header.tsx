import React, { memo, useState } from "react";
import "./Header.style.css";

import { ReactComponent as Search } from "@assets/icon/search_icon.svg";
import { ReactComponent as Calendar } from "@assets/icon/calendar_icon.svg";
import Modal from "@src/present/component/Modal/Modal";
import FilterModal from "@src/present/layout/FilterModal/FilterModal";
import { FilterType } from "@src/types/Filter";

function Header() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<FilterType>({
    headLine: "전체 헤드라인",
    date: "전체 날짜",
    country: "전체 국가",
  });

  // modal Handler
  const openHandler = () => {
    setModalOpen(true);
  };

  const closeHandler = () => {
    setModalOpen(false);
  };

  // Header Components
  const content = [
    { svg: <Search />, content: "전체 헤드라인" },
    { svg: <Calendar />, content: "전체 날짜" },
    { svg: null, content: "전체 국가" },
  ];

  const headerCompos = content.map((elem, idx) => {
    return (
      <div className="HeaderCompo" key={idx} onClick={openHandler}>
        {elem.svg}
        <div>{elem.content}</div>
      </div>
    );
  });

  return (
    <div className="Header">
      {headerCompos}
      {modalOpen && (
        <Modal>
          <FilterModal onClose={closeHandler} query={query}/>
        </Modal>
      )}
    </div>
  );
}

export default memo(Header);
