import {useLocation} from "react-router-dom"
import { useState, useEffect, useRef } from "react"

import axios from 'axios'

import '../css/play.css'

const Play = ()=>{

    const [gameReady, setReady] = useState(false) 
    const [success, setSuccess] = useState(false) 
    const [index, setIndex] = useState(0) 
    const [chosen, setChosen] = useState("none") 
    const endQuiz = useRef(false)

    const [questionList, setQuestionList] = useState([])

    const [score, setScore] = useState(0)

    const [done, setDone] = useState(false)

    const finalScore = useRef(0)

    const location = useLocation()

    const numQuestions = location.state.number
    const language = location.state.language


    const nextQuestion =()=>{
        if(index < questionList.length - 1){
            setIndex(index + 1)

            setDone(false)
            setChosen("none")

        }
        else{
            endQuiz.current = true
        }  

    }

    const showAnswer =()=> {
        setDone(true)
    }

    const finishQuestion =()=> {

        showAnswer()

        setTimeout(nextQuestion, 1000)
    
    }


    const wrongAnswer=(e, choice)=>{
        if(done)
            return

        if(endQuiz.current)
            return

        if(choice !== questionList[index].answer){
          setChosen(e.target.id)
          
        }
        else{
            setScore(score + 1)
            finalScore.current += 1

        }
        finishQuestion()
    }

    const getGame =()=>{

        const baseUrl = 'http://app-hackathon.azurewebsites.net/game'

        const request = axios.post(baseUrl,
            {
                language: language,
                quantity: numQuestions
            }
 
        )

        request.then(response=>{
            if(response.status === 200){
                setSuccess(true)

                setQuestionList(response.data.game_result.questions)
                
              }

            else{
                setSuccess(false)
            }

            setReady(true)
        })
        .catch(error=> {
            console.log(error)
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
    <div style={{display:'flex', flexDirection:'column', justifyContent:'flex-start', flex:'1 1 0'}}>
        <div className="questionBox">

            <div style={{fontSize: '1.25rem'}} className=''>
                {questionList[index].question} 
            </div>

            <div style={{fontSize: '1.25rem'}} className=" ">
                        
                {language}
                <br/><br/>
                {score} / {questionList.length}
            
            </div>
        </div>

        <div id = "choice-container">
                <button id="one" className = {(questionList[index].answer === 0 && done === true)?  
                  "buttonTop right" :
                    chosen === "one"? "buttonTop wrong" : "buttonTop"} onClick={(e)=>wrongAnswer(e, 0)}>{questionList[index].choices[0]}</button>
                <button id="two" className = {(questionList[index].answer === 1 && done === true)?   
                  "buttonTop right" :
                    chosen === "two"? "buttonTop wrong" : "buttonTop"} onClick={(e)=>wrongAnswer(e, 1)}>{questionList[index].choices[1]}</button>
                <button id ="three" className = {(questionList[index].answer === 2 && done === true)? 
                  "buttonTop right" :
                    chosen === "three"? "buttonTop wrong" : "buttonTop"} onClick={(e)=>wrongAnswer(e, 2)}>{questionList[index].choices[2]}</button>
                <button id="four" className = {(questionList[index].answer === 3 && done === true)? 
                  "buttonTop right" :
                    chosen === "four"? "buttonTop wrong" : "buttonTop"} onClick={(e)=>wrongAnswer(e, 3)}>{questionList[index].choices[3]}</button>
        </div>
    </div>
    )
}

export default Play