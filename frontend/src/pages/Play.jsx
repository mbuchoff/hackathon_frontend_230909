import {useLocation} from "react-router-dom"
import { useState, useEffect } from "react"

import axios from 'axios'

import '../css/play.css'

const Play = ()=>{

    const [gameReady, setReady] = useState(false) 
    const [success, setSuccess] = useState(false) 

    const [answer, setAnswer] = useState('')
    const [choices, setChoices] = useState([])

    const location = useLocation()

    const numQuestions = location.state.number
    const language = location.state.language

    const getGame =()=>{

        const baseUrl = 'http://localhost:9999/question'
        const request = axios.post(baseUrl,
            {
                'language': language,
                'num_questions': numQuestions,
            },
        )

        request.then(response=>{
            if(response.status === 200){
                setSuccess(true)

                setAnswer(response.data)
                console.log(response.data)
              }

            else{
                setSuccess(false)
            }

            setReady(true)
        })

    }

    useEffect(() => {
        getGame()
        
        // eslint-disable-next-line
      }, [])




    if(!gameReady){
       
        return(
            <div style={{textAlign:'center'}}>
                <div className = "loadingScreen">Loading...</div>
            </div>
        )
    }

    if(!success){
       
        return(
            <div style={{textAlign:'center'}}>
                <div className = "loadingScreen">An error occured. Try refreshing the page.</div>
            </div>
        )
    }

    return(
    <div >
        <div>

            <p>The Game</p>
            <p>{answer}</p>

            <ul className= 'list1' style = {{listStyleType: "none", overflow: 'auto',  minHeight:'20rem', flex:'1 1 0', marginBottom:'0'}}  >
                {choices.map((choice, index) => 
                  <li key={index}> {choice} </li>
                )}
            </ul>
        </div>
    </div>
    )
}

export default Play