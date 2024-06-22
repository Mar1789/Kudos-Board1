import "./App.css"
import "./BoardWebsite.css"
import CardGrid from "./CardGrid"
const Board = (props) => {
    return(
        <>
            <div className="website-cards">
                <header>
                    <div className="center">
                        <h2>{`🤝  Kuboard Board:  ${props.id} 🤝 ` } <br/></h2>
                    </div>
                </header>   
            </div>
            <CardGrid id={props.id} fetch={props.fetch}/>
        </>
    )
}
export default Board;