import { useState, useEffect } from 'react'
import './App.css'
import BoardGrid from './BoardGrid.jsx'
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './Home.jsx'
import Board from "./Board.jsx"

function App() {
  const [board, setBoard] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/board", {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
      },
    }).then((data) =>
      data.json().then((data) => {
        setBoard(data);
      })
    );
  }, [board]);
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home/>}/>
        {board.map(card => (
          <Route key={card.id} path={`/board/${card.id}`} element={<Board id={card.id}/>}/>
        ))}
      </Routes>
    </Router>
  )
}

export default App;
