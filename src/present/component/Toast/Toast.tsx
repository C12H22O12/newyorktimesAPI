import React, { memo, ReactNode } from "react";
import * as ReactDOM from "react-dom";

type ToastProps = {
  children: ReactNode;
};

function Toast({ children }: ToastProps) {
  const el = document.getElementById("toastRoot") as HTMLElement;

  return ReactDOM.createPortal(children, el);
}

export default memo(Toast);
