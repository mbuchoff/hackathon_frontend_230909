import { useState, useEffect} from 'react'
import {Route, Routes, Link, useNavigate} from "react-router-dom"
import axios from 'axios'

import Home from './pages/Home'
import ChooseGame from './pages/ChooseGame'
import Play from './pages/Play'
import ProtectedRoute from './components/ProtectedRoute'


import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap/dist/css/bootstrap.css'

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import './css/home.css'

function App() {
  




  
  return (
    <div className='wholeScreen'>
      <header className='myHeader'>
          <Navbar collapseOnSelect expand="md" className='' style={{padding:'0'}}>

        
          <Navbar.Brand as={Link} to='/' className='logo' 
                style={{ fontSize: '48px',textDecoration:'none', padding:'0'}}>
                Sentence match
          </Navbar.Brand>

          <Navbar.Toggle />

          <Navbar.Collapse > 
            <Nav className='ms-auto verticalText' >
        
            <Nav.Link style={{padding:'0 24px 0px 0', height:'fit-content', textAlign:'left', width: '100%'}} 
            eventKey={1} as={Link} to="/" className=" navMenu ">Home</Nav.Link>

            <Nav.Link style={{padding:'0 24px 0px 0', height:'fit-content', textAlign:'left', width:'100%'}} 
            eventKey={2} as={Link} to="/choose-game" className="navMenu">Play&nbsp;Game</Nav.Link>

            </Nav>
          </Navbar.Collapse>

        </Navbar>
      </header>

      <div className = 'wholeDefault'>
        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/choose-game" element={<ChooseGame />} />

          <Route element = {<ProtectedRoute />}>
            <Route path="/play" element={<Play />} />
          </Route>

        </Routes>
      </div>

    </div>
  )
}

export default App
