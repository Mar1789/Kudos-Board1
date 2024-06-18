import { useState } from 'react'
import './App.css'
import BoardGrid from './BoardGrid.jsx'
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './Home.jsx'

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </Router>
  )
}

export default App;
