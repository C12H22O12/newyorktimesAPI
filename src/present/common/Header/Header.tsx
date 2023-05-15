import React, { memo, useEffect, useState } from "react";
import "./Header.style.css";

import { ReactComponent as Search } from "@assets/icon/search_icon.svg";
import { ReactComponent as Calendar } from "@assets/icon/calendar_icon.svg";
import Modal from "@src/present/component/Modal/Modal";
import FilterModal from "@src/present/layout/FilterModal/FilterModal";
import { FilterType } from "@src/types/Filter";

type HeaderProps = {
  setUrl: any;
};

function Header({ setUrl }: HeaderProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<FilterType>({
    headLine: "",
    date: "",
    country: [],
  });

  useEffect(() => {
    let tmpUrl = "";

    if (query.headLine !== "") {
      tmpUrl += `&q=${query.headLine}`;
    }

    if (query.date !== "") {
      tmpUrl += `&begin_date=${query.date}&end_date=${query.date}`;
    }

    if (query.country.length !== 0) {
      tmpUrl += `&fq=glocations:(`
      for (const i of query.country) {
        tmpUrl += `"${i}",`
      }

      tmpUrl += `)`
    }

    console.log(tmpUrl);

    return () => {
      setUrl(tmpUrl);
    };
  }, [query]);

  // modal Handler
  const openHandler = () => {
    setModalOpen(true);
  };

  const closeHandler = () => {
    setModalOpen(false);
  };

  // query handler
  const queryHandler = (modalQuery) => {
    setQuery({ ...modalQuery });
  };

  console.log(query);

  // Header Components
  const content = [
    { svg: <Search />, content: query.headLine },
    { svg: <Calendar />, content: query.date },
    { svg: null, content: query.country },
  ];

  const headerCompos = content.map((elem, idx) => {
    if (idx < 2) {
      const addClass = elem.content !== "" ? "checked" : "";
      let blank = "";

      switch (idx) {
        case 0:
          blank = "전체 헤드라인";
          break;
        case 1:
          blank = "전체 날짜";
          break;
      }

      return (
        <div
          className={`HeaderCompo ${addClass}`}
          key={idx}
          onClick={openHandler}
        >
          {elem.svg}
          <div>{elem.content === "" ? blank : elem.content}</div>
        </div>
      );
    } else {
      const addClass = elem.content.length === 0 ? "" : "checked";
      return (
        <div
          className={`HeaderCompo ${addClass}`}
          key={idx}
          onClick={openHandler}
        >
          {elem.svg}
          <div>{elem.content.length === 0 ? "전체 국가" : elem.content}</div>
        </div>
      );
    }
  });

  return (
    <div className="Header">
      {headerCompos}
      {modalOpen && (
        <Modal>
          <FilterModal onClose={closeHandler} queryHandler={queryHandler} />
        </Modal>
      )}
    </div>
  );
}

export default memo(Header);
