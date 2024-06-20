import { useState, useEffect } from "react";
import GIF from "./GifGrid";
import "./BoardWebsite.css";
const CardModal = (props) => {
  const [data, setData] = useState([]);
  const [video, setVideo] = useState("");
  const [gif, setGif] = useState(false);
  const [url, setUrl] = useState("");
  const [search, setSearch] = useState("");
  let id = props.query;

  function handleClick(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const arr = [];
    console.log(formData.get("category"));
    arr[0] = formData.get("title");
    arr[1] = formData.get("author");
    arr[2] = formData.get("category");
    console.log(arr);
    fetch(`http://localhost:3000/${id}`, {
      method: "POST",
      body: JSON.stringify({ title: arr[0], author: arr[1], category: arr[2] }),
      headers: {
        "Content-Type": "Application/json",
      },
    }).then((data) =>
      data.json().then((data) => {
        console.log(data);
      })
    );
    props.create(arr);
    props.close();
  }
  function Close() {
    setGif(false);
    props.close();
  }
  function OpenGIF(e) {
    console.log("opengif");
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    setSearch(formData.get("GIF"));
    setGif(true);
  }
  return (
    <div id="modal">
      <div className="card-modal-content">
        <span className="close" onClick={Close}>
          &times;
        </span>
        <h3 className="h3-card">Create a new Card</h3>
        <form onSubmit={handleClick} className="info">
          <label className="title" htmlFor="title">
            Title:<input className="box" name="title" required></input>
          </label>
          <br></br>
          <label className="description" htmlFor="description">
            Text:<input className="box" name="description" required></input>
          </label>
          <br />
          <label className="owner" htmlFor="owner">
            Owner: <input className="box" name="owner" required></input>
            <button className="description">Submit</button>
          </label>
          <br />
        </form>
        <form onSubmit={OpenGIF} className="gifSearch">
          <label htmlFor="gif">Search GIF Here: </label>
          <input name="GIF"></input>
          <button type="submit" className="">
            Search
          </button>
        </form>
        {gif && <GIF search={search} url={setUrl}/>}
      </div>
    </div>
  );
};
export default CardModal;
