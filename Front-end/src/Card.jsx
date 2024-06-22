import { useState, useEffect } from "react";
import CommentModal from "./CommentModal";
import "./Board.css";
const Board = (props) => {
  const [open, setOpen] = useState(false);
  function Delete(e) {
    fetch(`https://kudos-board1.onrender.com/card/${props.id}`, {
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
    fetch(`https://kudos-board1.onrender.com/cards/${props.id}`, {
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
  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  return (
    <>
      {open && <CommentModal id={props.id} close={closeModal} />}
      <div className="board">
        <div className="main">
          <img className="boardImage" src={props.url} alt="NFT" />
          <p className="description">{props.description}</p>
          <h2>{props.title}</h2>
          <div className="duration"></div>
          <hr />
          <div className="buttons">
            <div className="wrapper">
              <button className="delete" onClick={handleLike}>
                Like: {props.like}
              </button>
              <button className="delete" onClick={Delete}>
                Delete Card
              </button>
              <button className="delete" onClick={openModal}>
                Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Board;
