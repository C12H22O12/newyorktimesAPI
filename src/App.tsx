import { useState } from "react";
import { Route, Routes,BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./present/common/Navbar";
import Home from "./present/pages/Home/Home";
import Scrapscreen from "./present/pages/Scrapscreen/Scrapscreen";

function App() {
  return (
    <BrowserRouter>
      <div id="app">
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/home"} element={<Home />} />
          <Route path={"/scrapscreen"} element={<Scrapscreen />} />
        </Routes>
        <Navbar />
      </div>
    </BrowserRouter>
  );
}

export default App;
