import { useState, useEffect } from "react";
import BoardCard from "./BoardCard.jsx";
import Modal from "./Modal.jsx";
const BoardGrid = (props) => {
  let url;
  const [board, setBoard] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");

  function fetchData(filter, search) {
    props.fetch();
    if (filter !== "") {
      if (filter === "Recent") {
        url = `https://kudos-board1.onrender.com/recent`;
      } else {
        url = `https://kudos-board1.onrender.com/filter/${filter}`;
      }
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
      url = `https://kudos-board1.onrender.com/search/${search}`;
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
      url = "https://kudos-board1.onrender.com/board";
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
  }

  useEffect(() => {
    fetchData(filter, search);
  }, [search, filter]); // remove render etc
  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    setSearch(formData.get("search"));
  }

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }
  function FilterCard(e) {
    if (e.target.textContent === "All") {
      setFilter("");
    } else {
      setFilter(e.target.textContent);
    }
  }
  function boardGridFetch() {
    fetchData(filter, search);
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
      {open && <Modal fetch={boardGridFetch} close={closeModal} />}

      <div className="container">
        {board.map((card) => (
          <BoardCard
            key={card.id}
            url="https://i.redd.it/nfzw8hbxlrg71.jpg"
            title={card.title}
            category={card.category}
            id={card.id}
            fetch={boardGridFetch}
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
