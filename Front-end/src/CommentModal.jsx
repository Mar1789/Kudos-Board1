import { useState, useEffect } from "react";
import Comment from "./Comment"
import "./BoardWebsite.css";
const CardModal = (props) => {
  const [comments, setComments] = useState([]);
  function handleClick(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    let arr = [];
    arr[0] = formData.get("text");
    fetch(`https://kudos-board1.onrender.com/comments/${props.id}`, {
      method: "POST",
      body: JSON.stringify({ text: arr[0] }),
      headers: {
        "Content-Type": "Application/json",
      },
    }).then((data) =>
      data.json().then((data) => {
        Comments();
      })
    );
  }
  function Close() {
    props.close();
  }
  function Comments() {
    fetch(`https://kudos-board1.onrender.com/comments/${props.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
      },
    }).then((data) =>
      data.json().then((data) => {
        setComments(data);
      })
    );
  }
  useEffect(() => {
    Comments();
  }, []);

  return (
    <div id="modal">
      <div className="card-modal-content">
        <span className="close" onClick={Close}>
          &times;
        </span>
        <h3 className="h3-card">Comments</h3>
        <form onSubmit={handleClick} className="info">
          <input
            placeholder="Text.."
            className="box"
            name="text"
            required
          ></input>
          <div className="submit">
            <button className="button">Submit</button>
          </div>
        </form>
        <div className="comment-container">
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              text={comment.text}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default CardModal;
