import {useNavigate} from "react-router-dom"

import { useState } from "react"

import Select from 'react-select'

import '../css/choose.css'

const ChooseGame = ()=>{

    const navigate = useNavigate()

    const [quantity, setQuantity] = useState(10)

    const [language, setLanguage] = useState('en')

    const changeNumber=(e)=>{

        const number = parseInt(e.target.value)
    
        setQuantity(number)
    }

    const languageList = [
        {value:'en', label:'English'},
        {value:'es', label:'Spanish'},
        {value:'pt', label:'Portuguese'},
        {value: 'fr', label: 'French'},
        {value: 'jp', label: 'Japanese'}
    ]


    return(
    <div className="flexChoose">
        <div>
            <p>Select options then start</p>
            <button className="btn btn-primary myButton " onClick={()=>navigate('/play', 
                { state: { language: language, number: quantity} })}>Start
            </button>
        </div>

        <div className='questionMenu '>
                
                <p style={{margin: '.5rem'}}>Number of Questions</p>
                
                <label htmlFor="ten" className = 'questionLabel'>
                <input type="radio" id="ten" name="quantity" value = '10' onChange = {changeNumber}/>
                &nbsp;&nbsp;<span className="radioText">10</span>
                </label>
               
                
                <label htmlFor="twenty" className = 'questionLabel'>
                <input type="radio" id="twenty" name="quantity" value = '20' onChange = {changeNumber}/>
                &nbsp;&nbsp;<span className="radioText">20</span>
                </label>
               
                
                <label htmlFor="thirty" className = 'questionLabel'>
                <input type="radio" id="thirty" name="quantity" value = '30' onChange = {changeNumber}/>
                &nbsp;&nbsp;<span className="radioText">30</span>
                </label>
               
        </div>

        <Select style={{width: '500px'}} menuPortalTarget={document.body}
                        defaultValue={
                          'es'
                        }
                        options={languageList}
                        isSearchable = {true}
                        onChange={(opt)=>setLanguage(opt.value)}
        />
    </div>
    )
}

export default ChooseGame