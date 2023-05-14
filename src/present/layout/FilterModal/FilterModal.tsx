import Button from "@src/present/common/Button/Button";
import React, { memo } from "react";
import "./FilterModal.style.css";

function FilterModal({ onClose }: any) {
  return (
    <div id="background">
      <div className="modalBody">HI
      <Button content="필터 적용하기" />
      </div>
    </div>
  );
}

export default memo(FilterModal);
