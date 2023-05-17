import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import "./FilterModal.style.css";

import Button from "@common/Button/Button";
import ModalHeader from "@component/ModalHeader/ModalHeader";
import NationCompo from "@component/NationCompo/NationCompo";

import { ReactComponent as Calendar } from "@assets/icon/calendar_icon.svg";

import { FilterType } from "@src/types/Filter";
import { nationList } from "@src/constant/lists";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";

import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

type FilterModalProps = {
  onClose: () => void;
  queryHandler: (modalQuery:FilterType) => void;
};

function FilterModal({ onClose, queryHandler }: FilterModalProps) {
  const [flag, setFlag] = useState<boolean>(true); // 첫 렌더링 판단
  const [targetDate, setTargetDate] = useState(new Date());
  const [inputDate, setInputDate] = useState<string>("날짜를 선택해주세요");
  const [modalQuery, setModalQuery] = useState<FilterType>({
    headLine: "",
    date: null,
    country: [],
  });

  useEffect(() => {
    if (flag) {
      setFlag(false);
      return;
    }

    setModalQuery((prev) => {
      return { ...prev, date: targetDate };
    });
    setInputDate(format(targetDate, "yyyy.MM.dd"));
  }, [targetDate]);

  // datepicker
  const datepickerPlaceholder = (
    <div id="datepickerLabel">
      <div
        className={`${
          inputDate !== "날짜를 선택해주세요" ? "queryChecked" : "isInit"
        }`}
      >
        {inputDate}
      </div>
      <Calendar />
    </div>
  );

  // Apply Filter
  const filterhandler = () => {
    queryHandler(modalQuery);
    onClose();
  };

  // Headline handler
  const headlineHandler = (e) => {
    setModalQuery((prev) => {
      return { ...prev, headLine: e.target.value };
    });
  };

  // Nation handler
  const nationHandler = useCallback(
    (checked: boolean, item: string) => {
      if (checked) {
        setModalQuery((prev) => {
          return { ...prev, country: [...prev.country, item] };
        });
      } else {
        setModalQuery((prev) => {
          return { ...prev, country: prev.country.filter((el) => el !== item) };
        });
      }
    },
    [modalQuery.country]
  );

  const mappingNation = nationList.map((elem, idx) => {
    return <NationCompo key={idx} nation={elem} handler={nationHandler} />;
  });

  return (
    <div>
      <div id="background" onClick={onClose} />
      <div className="modalBody">
        {/* Headline */}
        <div className="modalCompo">
          <ModalHeader content="헤드라인" />
          <input
            id="headLine"
            type="text"
            placeholder="검색하실 헤드라인을 입력해주세요."
            onChange={headlineHandler}
          />
        </div>

        {/* Datepicker */}
        <div className="modalCompo">
          <ModalHeader content="날짜" />
          <DatePicker
            locale={ko}
            selected={targetDate}
            onChange={(date) => setTargetDate(date)}
            customInput={datepickerPlaceholder}
          />
        </div>

        {/* Country */}
        <div className="modalCompo">
          <ModalHeader content="국가" />
          <div className="nations">{mappingNation}</div>
        </div>

        {/* Submit */}
        <Button content="필터 적용하기" handler={filterhandler} />
      </div>
    </div>
  );
}

export default memo(FilterModal);
