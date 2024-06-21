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
    if(url === ""){
        window.alert("Please select a gif for your card!");
        return;
    }
    arr[0] = formData.get("title");
    arr[1] = formData.get("description");
    arr[2] = formData.get("owner");
    arr[3] = url;
    fetch(`http://localhost:3000/${props.id}`, {
      method: "POST",
      body: JSON.stringify({ title: arr[0], description: arr[1],  gif: arr[3], owner: arr[2] }),
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
    setUrl("");
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
          <input placeholder="Title.." className="box" name="title" required></input>
          <br></br>
          <input placeholder="Description.." className="box" name="description" required></input>
          <br />
          <input className="box" name="owner" ></input>
            <div className="submit"><button className="button">Submit</button></div>
          <br />
        </form>
        <form onSubmit={OpenGIF} className="gifSearch">
          <label htmlFor="gif">Search GIF Here: </label>
          <input name="GIF"></input>
          <button type="submit" className="button">
            Search
          </button>
        </form>
        {gif && <GIF search={search} url={setUrl}/>}
      </div>
    </div>
  );
};
export default CardModal;
