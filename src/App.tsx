import { useState } from 'react'
import { Route } from 'react-router'
import { Routes } from 'react-router-dom'
import './App.css'
import Navbar from './present/common/Navbar'

function App() {
  return (
    <div id="app">
      <Routes>
        {/* <Route path={"/home"} element={< />}></Route>
        <Route path={"/scrap"} element={< />}></Route> */}
      </Routes>
      <Navbar />
    </div>
  )
}

export default App
