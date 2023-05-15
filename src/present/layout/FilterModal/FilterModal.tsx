import React, { memo, useEffect, useRef, useState } from "react";
import "./FilterModal.style.css";

import Button from "@src/present/common/Button/Button";
import ModalHeader from "@src/present/component/ModalHeader/ModalHeader";
import NationCompo from "@src/present/component/NationCompo/NationCompo";

import { ReactComponent as Calendar } from "@assets/icon/calendar_icon.svg";

import { FilterType, NationCompoTypes } from "@src/types/Filter";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";

import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

type FilterModalProps = {
  onClose: any,
  query : FilterType
}

function FilterModal({ onClose, query }: FilterModalProps) {
  const [startDate, setStartDate] = useState(new Date());
  const [inputDate, setInputDate] = useState<string>("날짜를 선택해주세요");

  useEffect(() => {
    if (query.date !== "") {
      setInputDate(format(startDate, "yyyy.MM.dd"));
    }
  }, [startDate]);

  // nation
  const nationList: Array<NationCompoTypes> = [
    { country: "대한민국", value: "" },
    { country: "중국", value: "" },
    { country: "일본", value: "" },
    { country: "미국", value: "" },
    { country: "북한", value: "" },
    { country: "러시아", value: "" },
    { country: "프랑스", value: "" },
    { country: "영국", value: "" },
  ];

  const mappingNation = nationList.map((elem, idx) => {
    return <NationCompo key={idx} nation={elem} />;
  });

  // datepicker
  const datepickerPlaceholder = (
    <div id="datepickerLabel">
      <div className="isInit">{inputDate}</div>
      <Calendar />
    </div>
  );

  // Apply Filter
  const filterhandler = () => {
    onClose()
  }

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
          />
        </div>

        {/* Datepicker */}
        <div className="modalCompo">
          <ModalHeader content="날짜" />
          <DatePicker
            locale={ko}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            customInput={datepickerPlaceholder}
          />
        </div>

        {/* Country */}
        <div className="modalCompo">
          <ModalHeader content="국가" />
          <div className="nations">{mappingNation}</div>
        </div>

        {/* Submit */}
        <Button content="필터 적용하기" handler={filterhandler}/>
      </div>
    </div>
  );
}

export default memo(FilterModal);
