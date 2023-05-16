import React, { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import "./App.css";

import Header from "@present/common/Header/Header";
import Navbar from "@present/common/Navbar/Navbar";
import Home from "@present/pages/Home/Home";
import Scrapscreen from "@present/pages/Scrapscreen/Scrapscreen";

function App() {
  return (
    <BrowserRouter>
      <div id="app">
        <div id="toastRoot" />
        <Header />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/home"} element={<Home />} />
          <Route
            path={"/scrapscreen"}
            element={<Scrapscreen />}
          />
        </Routes>
        <Navbar />
      </div>
      <div id="modalRoot" />
    </BrowserRouter>
  );
}

export default App;
