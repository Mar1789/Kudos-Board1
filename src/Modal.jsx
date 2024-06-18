import { useState, useEffect } from "react";
import "./App.css"
const Modal = (props) =>{
    const [data, setData] = useState([]);
    const [video, setVideo] = useState("");
    let id = props.query;
    let url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`

    function handleClick(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const arr = [];
        arr[0] = formData.get("title");
        arr[1] = formData.get("category");
        arr[2] = formData.get("author");
        console.log(arr);
        fetch("http://localhost:3000/board", {
        method: "POST",
        body: JSON.stringify({ title: arr[0], author: arr[1], category: arr[2] }),
        headers: {
            "Content-Type": "Application/json",
        },
        }).then((data) =>
        data.json().then((data) => {
            console.log(data);
        }))
        props.create(arr);
        props.close();
        }
    function Close(){
        props.close();
    }
    return(
    <div id="modal">
        <div className="modal-content">
        <span className="close" onClick={Close}>&times;</span>
            <h3>Create a new board</h3>
                <form onSubmit={handleClick}>  
                    <label htmlFor="title">Title:</label>
                        <input name="title" required></input>
                        <br></br>
                    <label htmlFor="category">Category: </label>
                    <input name="category" required></input>
                    <br></br>
                    <label htmlFor="author" >Author: </label>
                    <input name="author" required></input>
                    <br></br>
                    <button>Submit</button>
                </form>
        </div>
    </div>
 )
}
export default Modal;