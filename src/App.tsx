import React, { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import "./App.css";

import { ToastType } from "@src/types/Toast";
import Header from "@present/common/Header/Header";
import Navbar from "@present/common/Navbar/Navbar";
import Home from "@present/pages/Home/Home";
import Scrapscreen from "@present/pages/Scrapscreen/Scrapscreen";

function App() {
  const [toastOn, setToastOn] = useState<ToastType>({
    isToast: false,
    type: "",
    contentHeader: "",
    contentBody: "",
  });

  // Props that passed to Home Component
  const HomeProps = {
    toastOn: toastOn,
    setToastOn: setToastOn,
  };

  return (
    <BrowserRouter>
      <div id="app">
        <div id="toastRoot" />
        <Header />
        <Routes>
          <Route path={"/"} element={<Home {...HomeProps} />} />
          <Route path={"/home"} element={<Home {...HomeProps} />} />
          <Route
            path={"/scrapscreen"}
            element={<Scrapscreen setToastOn={setToastOn} />}
          />
        </Routes>
        <Navbar />
      </div>
      <div id="modalRoot" />
    </BrowserRouter>
  );
}

export default App;
