import { useState, useEffect } from "react";
import "./Board.css";
const Board = (props) => {
    function Delete(e){
        fetch(`https://kudos-board1.onrender.com/${props.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json",
      },
    }).then((data) =>
      data.json().then((data) => {
        props.fetch();
      })
    );
   
    }
    function View(e){
      window.location.href = `/board/${props.id}`
      
    }
  return (
    <div className="board">
      <div className="main">
        <img
          className="boardImage"
          src="https://images.unsplash.com/photo-1621075160523-b936ad96132a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="NFT"
        />
        <p className="description">
          {props.category}
        </p>
        <h2>{props.title}</h2>
        <div className="duration"></div>
        <hr/>
        <div className="buttons">
          <div className="wrapper">
            <button className="view-board" onClick={View}>View Board</button>
            <button className="view-board" onClick={Delete}>Delete Board</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Board;
