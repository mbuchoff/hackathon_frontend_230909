import {useNavigate} from "react-router-dom"



const Home = ()=>{

    const navigate = useNavigate()

    return(
    <div >
        <div>
            <p>A game where you can choose a language and practice translation</p>
            <button className="btn btn-primary myButton " onClick={()=>navigate('/choose-game')}>Play Game</button>
        </div>
    </div>
    )
}

export default Home