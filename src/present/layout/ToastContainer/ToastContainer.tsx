import { useToastStore } from "@src/store/useToastStore";
import React, { memo, useEffect, useState } from "react";
import "./ToastContainer.style.css";

function ToastContainer() {
  const {toast, closeToast} = useToastStore(state => state)
  const [isAppear, setIsAppear] = useState(true);

  useEffect(() => {
    const animationTimer = setInterval(() => {
      setIsAppear(false);
    }, 4000);

    const apperTimer = setTimeout(() => {
      closeToast();
    }, 5000);

    return () => {
      clearTimeout(animationTimer);
      clearTimeout(apperTimer);
    };
  }, []);

  return (
    <div className={`toastContainer ${toast.type} ${!isAppear && "disappear"}`}>
      <div>{toast.contentHeader}</div>
      <div>{toast.contentBody}</div>
    </div>
  );
}

export default memo(ToastContainer);
