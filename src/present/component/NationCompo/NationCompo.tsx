import React, { memo, useState } from "react";
import "./NationCompo.style.css";

type NationCompoProps = {
  nation: string;
  isClicked: boolean
};

function NationCompo({ nation, isClicked }: NationCompoProps) {

  return (
    <div className={`NationCompo ${isClicked ? "active" : null}`}>{nation}</div>
  );
}

export default memo(NationCompo);
