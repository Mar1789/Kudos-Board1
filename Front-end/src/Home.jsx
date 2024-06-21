import './App.css'
import BoardGrid from './BoardGrid.jsx'

function Home(props) {

  return (
    <>
    <div className='website'>
    <header>
    <div className="center">
      <div>
        <h2>🤝 Kudo Board 🤝</h2>
      </div>
    </div>
    </header>
    </div>
    <BoardGrid fetch={props.fetch}/>
    </>

  )
}

export default Home;
