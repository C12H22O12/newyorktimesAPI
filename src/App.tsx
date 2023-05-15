import React, { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import "./App.css";

import useData from "@src/actions/hooks/useData";

import { ToastType } from "@src/types/Toast";
import { ArticleType } from "@src/types/Article";
import Header from "@present/common/Header/Header";
import Navbar from "@present/common/Navbar/Navbar";
import Home from "@present/pages/Home/Home";
import Scrapscreen from "@present/pages/Scrapscreen/Scrapscreen";
import { useDataTypes } from "./types/Article";

function App() {
  const [url, setUrl] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [articleList, setArticleList] = useState<Array<ArticleType | any>>([]);
  const [toastOn, setToastOn] = useState<ToastType>({
    isToast: false,
    type: "",
    contentHeader: "",
    contentBody: "",
  });

  useEffect(() => {
    setUrl(`&page=${page}`);
  }, [page]);

  useEffect(() => {
    if ("q".includes(url)) {
      console.log("HI");
      setArticleList([]);
      setPage(1);
    }
  }, [url]);

  // get Article List
  const { moreData, target }: useDataTypes = useData({
    url: url,
    setToastOn: setToastOn,
    setPage: setPage,
    setArticleList: setArticleList,
  });

  // ToastHandler
  const toastCloseHandler = (): void => {
    setToastOn((prev) => {
      return { ...prev, isToast: false };
    });
  };

  // Props that passed to Home Component
  const HomeProps = {
    articleList: articleList,
    toastOn: toastOn,
    toastCloseHandler: toastCloseHandler,
    moreData: moreData,
    target: target,
    setToastOn: setToastOn,
  };

  return (
    <BrowserRouter>
      <div id="app">
        <div id="toastRoot" />
        <Header setUrl={setUrl} />
        <Routes>
          <Route path={"/"} element={<Home {...HomeProps} />} />
          <Route path={"/home"} element={<Home {...HomeProps} />} />
          <Route path={"/scrapscreen"} element={<Scrapscreen />} />
        </Routes>
        <Navbar />
      </div>
      <div id="modalRoot" />
    </BrowserRouter>
  );
}

export default App;
