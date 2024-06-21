import { useState, useEffect } from "react";
import Card from "./Card.jsx";
import CardModal from "./CardModal.jsx";
import "./BoardWebsite.css"
const CardGrid = (props) => {
  let url;
  const [board, setBoard] = useState([]);
  const [open, setOpen] = useState(false);
  
  function CardFetch(){
    console.log("TEST")
    url = `http://localhost:3000/cards/${props.id}`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
      },
    }).then((data) =>
      data.json().then((data) => {
        console.log("TEST", data);
        setBoard(data);
      })
    );
  }

  useEffect(() => {
    CardFetch();
  }, []);

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  return (
    <>
        <div className="create-card">
            <button className="button" onClick={openModal}>Create Card</button>
        </div>
      {open && <CardModal id={props.id} fetch={CardFetch} close={closeModal} />}
      <div className="container">
        {board.map((card) => (
          <Card
            key={card.id}
            url={card.gif}
            title={card.title}
            description={card.description}
            id={card.id}
            like={card.likecount}
            fetch={CardFetch}
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
