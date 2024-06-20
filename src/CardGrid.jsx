import { useState, useEffect } from "react";
import Card from "./BoardCard.jsx";
import CardModal from "./CardModal.jsx";
import "./BoardWebsite.css"
const CardGrid = (props) => {
  let url;
  const [board, setBoard] = useState([]);
  const [search, setSearch] = useState("");
  const [create, setCreate] = useState([]);
  const [open, setOpen] = useState(false);
  const [render, setRender] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setRender("");
    url = `http://localhost:3000/cards`;
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
  }, [create, search, render, filter]);

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  return (
    <>
        <div className="create-card">
            <button onClick={openModal}>Create Card</button>
        </div>
      {open && <CardModal create={setCreate} close={closeModal} />}
      <div className="container">
        {board.map((card) => (
          <Card
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
export default CardGrid;
