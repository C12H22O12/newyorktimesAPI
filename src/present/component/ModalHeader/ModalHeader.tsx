import React, { memo } from "react";
import './ModalHeader.style.css'

type ModalHeaderProps = {
  content: string;
};

function ModalHeader({ content }: ModalHeaderProps) {
  return <div className="modalHeader">{content}</div>;
}

export default memo(ModalHeader);
