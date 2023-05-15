import React, { memo, ReactNode } from "react";
import * as ReactDOM from "react-dom";

type ModalProps = {
  children: ReactNode;
};

function Modal({ children }: ModalProps) {
  const el = document.getElementById("modalRoot") as HTMLElement;

  return ReactDOM.createPortal(children, el);
}

export default memo(Modal);
