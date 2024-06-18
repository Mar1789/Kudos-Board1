import './App.css'
import BoardGrid from './BoardGrid.jsx'

function Home() {

  return (
    <div className='website'>
    <header>
    <div className="center">
      <div>
        <h2>Kudo Board</h2>
      </div>
    </div>
    <img className="center-img" src='https://media.istockphoto.com/id/973374928/vector/vector-of-handshake-icon-vector-iconic-design.jpg?s=612x612&w=0&k=20&c=ASQIa-xbFxu5jJKE32w4x63Ux45QxR4xhccP_k3PTwE='/>
    </header>
    <BoardGrid/>
    </div>

  )
}

export default Home;
