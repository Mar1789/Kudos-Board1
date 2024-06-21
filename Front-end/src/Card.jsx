import { useState, useEffect } from "react";
import "./Board.css";
const Board = (props) => {
    function Delete(e){
        fetch(`http://localhost:3000/card/${props.id}`, {
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
    function handleLike() {
        console.log(props.id);
        fetch(`http://localhost:3000/cards/${props.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
      },
    }).then((data) =>
      data.json().then((data) => {
        props.fetch();
      })
    );
    }

  return (
    <div className="board">
      <div className="main">
        <img
          className="boardImage"
          src={props.url}
          alt="NFT"
        />
        <p className="description">
          {props.description}
        </p>
        <h2>{props.title}</h2>
        <div className="duration"></div>
        <hr/>
        <div className="buttons">
          <div className="wrapper">
            <button className="delete" onClick={handleLike}>Like: {props.like}</button>
            <button className="delete" onClick={Delete}>Delete Card</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Board;