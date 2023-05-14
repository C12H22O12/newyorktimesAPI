import Button from "@src/present/common/Button/Button";
import ModalHeader from "@src/present/component/ModalHeader/ModalHeader";
import NationCompo from "@src/present/component/NationCompo/NationCompo";
import React, { memo } from "react";
import "./FilterModal.style.css";

function FilterModal({ onClose }: any) {
  // nation
  const nationList = [
    "대한민국",
    "중국",
    "일본",
    "미국",
    "북한",
    "러시아",
    "프랑스",
    "영국",
  ];

  const mappingNation = nationList.map((elem, idx) => {
    return <NationCompo key={idx} nation={elem} isClicked={false}/>;
  });

  return (
    <div id="background">
      <div className="modalBody">
        <div className="modalCompo">
          <ModalHeader content="헤드라인" />
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
