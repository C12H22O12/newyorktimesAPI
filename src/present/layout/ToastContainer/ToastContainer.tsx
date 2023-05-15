import { ToastType } from "@src/types/Toast";
import React, { memo, useEffect, useState } from "react";
import "./ToastContainer.style.css";

type ToastProps = {
  aboutToast: ToastType;
  closeHandler: any;
};

function ToastContainer({ aboutToast, closeHandler }: ToastProps) {
  const [isAppear, setIsAppear] = useState(true);

  useEffect(() => {
    const animationTimer = setInterval(() => {
      setIsAppear(false);
    }, 4000);

    const apperTimer = setTimeout(() => {
      closeHandler();
    }, 5000);

    return () => {
      clearTimeout(animationTimer);
      clearTimeout(apperTimer);
    };
  }, []);

  return (
    <div className={`toastContainer ${aboutToast.type} ${!isAppear && "disappear"}`}>
      <div>{aboutToast.contentHeader}</div>
      <div>{aboutToast.contentBody}</div>
    </div>
  );
}

export default memo(ToastContainer);
