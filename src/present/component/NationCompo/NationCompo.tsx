import React, { memo, useState } from "react";
import "./NationCompo.style.css";
import { NationCompoTypes } from "@src/types/Filter";

type NationCompoProps = {
  nation: NationCompoTypes;
};

function NationCompo({ nation }: NationCompoProps) {
  const { country, value } = nation;

  return (
    <>
      <input
        id={country}
        type="checkbox"
        name={country}
        className="nationInput"
        value={value}
      />
      <label htmlFor={country} className="NationCompo">
        {country}
      </label>
    </>
  );
}

export default memo(NationCompo);
