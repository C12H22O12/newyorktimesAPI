import Button from "@src/present/common/Button/Button";
import ModalHeader from "@src/present/component/ModalHeader/ModalHeader";
import NationCompo from "@src/present/component/NationCompo/NationCompo";
import { NationCompoTypes } from "@src/types/Filter";
import React, { memo } from "react";
import "./FilterModal.style.css";

function FilterModal({ onClose }: any) {
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

  return (
    <div id="background">
      <div className="modalBody">
        <div className="modalCompo">
          <ModalHeader content="헤드라인" />
          <input
            id="headLine"
            type="text"
            placeholder="검색하실 헤드라인을 입력해주세요."
          />
        </div>
        <div className="modalCompo">
          <ModalHeader content="날짜" />
        </div>
        <div className="modalCompo">
          <ModalHeader content="국가" />
          <div className="nations">{mappingNation}</div>
        </div>
        <Button content="필터 적용하기" />
      </div>
    </div>
  );
}

export default memo(FilterModal);
