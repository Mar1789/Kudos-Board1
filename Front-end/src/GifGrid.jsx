import { useState, useEffect } from "react";
import Card from "./BoardCard.jsx";
import CardModal from "./CardModal.jsx";
import "./BoardWebsite.css";
const CardGrid = (props) => {
  let url;
  const [board, setBoard] = useState([]);

  useEffect(() => {
    console.log(props.search);
    url = `https://api.giphy.com/v1/gifs/search?api_key=8Wx85CkT4HlWZwjS3fvabfz5DHGoCmuD&q=${props.search}&limit=18&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
    fetch(url
    ).then((data) =>
      data.json().then((data) => {
        setBoard(data.data);
      })
    );
  }, [props.search]);
  function HandleClick(e){
    props.url(e.target.src);
  }
  return (
    <div className="gif-container">
      {board.map((card) => (
        <img onClick={HandleClick} className="image" key={card.id} src={card.images.fixed_height.url} />
      ))}
    </div>
  );
};
export default CardGrid;
