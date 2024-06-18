import { useState, useEffect } from "react";
import Board from "./Board.jsx";
import Modal from "./Modal.jsx";
const BoardGrid = () => {
  const [board, setBoard] = useState([]);
  const [count, setCount] = useState(1);
  const [search, setSearch] = useState("");
  const [create, setCreate] = useState([]);
  const [open, setOpen] = useState(false);

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
  }, [board, create]);
  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    setSearch(formData.get("search"));
    if (count === 1) {
      setBoard(formData.get("search"));
    } else {
      setBoard((board) => [...board, formData.get("search")]);
    }
  }
  // function handleFilter(e){
  //     e.preventDefault();
  //     if(e.target.value === "Action"){
  //         setGenre(28);
  //     } else if(e.target.value === "Comedy"){
  //         setGenre(35);
  //     } else if(e.target.value === "Thriller"){
  //         setGenre(53);
  //     } else if(e.target.value === "War"){
  //         setGenre(10752);
  //     }else if(e.target.value === "Romance"){
  //         setGenre(10749);
  //     }else {
  //         setGenre(1);
  //     }
  // }
  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <input className="search" type="text" placeholder="Search.."></input>
        </label>
      </form>
      <div className="button-grid">
        <button>All</button>
        <button>Recent</button>
        <button>Celebration</button>
        <button>Thank You</button>
        <button>Inspiration</button>
        <button onClick={openModal}>Create a New Board</button>
      </div>
      {open && <Modal create={setCreate} close={closeModal} />}

      <div className="container">
      {board.map(card => (
        <Board key={card.id} url="https://i.redd.it/nfzw8hbxlrg71.jpg" title={card.title} category={card.category} id={card.id}/>
      ))}
      </div>
      <footer>
        <p>© Copyright 2024. All Rights Reserved.</p>
      </footer>
    </>
  );
};
export default BoardGrid;
