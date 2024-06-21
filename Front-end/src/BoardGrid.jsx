import { useState, useEffect } from "react";
import BoardCard from "./BoardCard.jsx"
import Modal from "./Modal.jsx";
const BoardGrid = () => {
  let url;
  const [board, setBoard] = useState([]);
  const [search, setSearch] = useState("");
  const [create, setCreate] = useState([]);
  const [open, setOpen] = useState(false);
  const [render, setRender] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log("RENDERED BOARD");
    setRender("");
    if (filter !== "") {
      url = `http://localhost:3000/filter/${filter}`;
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "Application/json",
        },
      }).then((data) =>
        data.json().then((data) => {
          setBoard(data);
        })
      );
    } else if (search !== "") {
      url = `http://localhost:3000/search/${search}`;
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "Application/json",
        },
      }).then((data) =>
        data.json().then((data) => {
          setBoard(data);
        })
      );
    } else {
      url = "http://localhost:3000/board";
      fetch(url, {
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
  }, [create, search, render, filter]);
  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    console.log(formData.get("search"));
    setSearch(formData.get("search"));
  }

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }
  function FilterCard(e) {
    console.log(e.target.textContent);
    if (e.target.textContent === "All") {
      setFilter("");
    } else {
      setFilter(e.target.textContent);
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            className="search"
            type="text"
            name="search"
            placeholder="Search.."
          ></input>
        </label>
      </form>
      <div className="button-grid">
        <button onClick={FilterCard}>All</button>
        <button onClick={FilterCard}>Recent</button>
        <button onClick={FilterCard}>Celebration</button>
        <button onClick={FilterCard}>Thank You</button>
        <button onClick={FilterCard}>Inspiration</button>
        <button onClick={openModal}>Create a New Board</button>
        </div>
      {open && <Modal create={setCreate} close={closeModal} />}

      <div className="container">
        {board.map((card) => (
          <BoardCard
            key={card.id}
            url="https://i.redd.it/nfzw8hbxlrg71.jpg"
            title={card.title}
            category={card.category}
            id={card.id}
            render={setRender}
          />
        ))}
      </div>
      <footer>
        <p>© Copyright 2024. All Rights Reserved.</p>
      </footer>
    </>
  );
};
export default BoardGrid;
