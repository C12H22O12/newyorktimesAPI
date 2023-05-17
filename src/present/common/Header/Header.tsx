import React, { memo, useEffect, useState } from "react";
import "./Header.style.css";

import { ReactComponent as Search } from "@assets/icon/search_icon.svg";
import { ReactComponent as Calendar } from "@assets/icon/calendar_icon.svg";
import Modal from "@src/present/component/Modal/Modal";
import FilterModal from "@src/present/layout/FilterModal/FilterModal";
import { FilterType } from "@src/types/Filter";
import { useUrlStore } from "@src/store/useUrlStore";
import { format } from "date-fns";
import { returnName } from "@action/modules/dummy";
import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation().pathname;
  const { setFilterUrl, setInitArticleList } = useUrlStore((state) => state);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<FilterType>({
    headLine: "",
    date: null,
    country: [],
  });

  useEffect(() => {
    setQuery({
      headLine: "",
      date: null,
      country: [],
    });
  }, [location]);

  useEffect(() => {
    let tmpUrl = "";

    if (query.headLine !== "") {
      tmpUrl += `&q=${query.headLine}`;
    }

    if (query.date !== null) {
      const tmpDate = format(query.date, "yyyyMMdd");
      tmpUrl += `&begin_date=${tmpDate}&end_date=${tmpDate}`;
    }

    if (query.country.length !== 0) {
      tmpUrl += `&fq=glocations:(`;
      for (const i of query.country) {
        tmpUrl += `"${i}",`;
      }

      tmpUrl += `)`;
    }

    setFilterUrl(tmpUrl);
    setInitArticleList()
  }, [query]);

  // modal Handler
  const openHandler = () => {
    setModalOpen(true);
  };

  const closeHandler = () => {
    setModalOpen(false);
  };

  // query handler
  const queryHandler = (modalQuery:FilterType) => {
    setQuery({ ...modalQuery });
  };

  // Header Components
  const content = [
    { svg: <Search />, content: query.headLine },
    {
      svg: <Calendar />,
      content: query.date !== null ? format(query.date, "yyyy.MM.dd") : "",
    },
    {
      svg: null,
      content:
        query.country.length !== 0
          ? returnName(query.country)
          : "",
    },
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
