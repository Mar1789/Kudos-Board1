import { useState, useEffect } from 'react'
import './App.css'
import BoardGrid from './BoardGrid.jsx'
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './Home.jsx'
import Board from "./Board.jsx"

function App() {
  const [board, setBoard] = useState([]);
  function Fetch(){
    fetch("https://kudos-board1.onrender.com/board", {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
      },
    }).then((data) =>
      data.json().then((data) => {
        setBoard(data);
      })
    );
  }
  function HomePage(){
    window.location.href = "/";

  }
  useEffect(() => {
    Fetch();
  }, []);
  return (
    <>
    <button className='home' onClick={HomePage}>Home</button>
    <Router>
      <Routes>
      <Route path="/" element={<Home fetch={Fetch}/>}/>
        {board.map(card => (
          console.log(card.id),
          <Route key={card.id} path={`/board/${card.id}`} element={<Board id={card.id}/> }/>
        ))}
      </Routes>
    </Router>
    </>
  )
}

export default App;
