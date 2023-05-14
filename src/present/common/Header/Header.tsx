import React, { memo, useState } from "react";
import "./Header.style.css";

import { ReactComponent as Search } from "@assets/icon/search_icon.svg";
import { ReactComponent as Calendar } from "@assets/icon/calendar_icon.svg";
import Modal from "@src/present/component/Modal/Modal";
import FilterModal from "@src/present/layout/FilterModal/FilterModal";

function Header() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

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
          <FilterModal onClose={closeHandler} />
        </Modal>
      )}
    </div>
  );
}

export default memo(Header);
