import { useState } from 'react'
import './App.css'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router, Routes, Route} from 'react-router';
import NavBar from './components/Navbar';
import Homepage from './pages/Homepage';
import Projects from './pages/Projects';
import Account from './pages/Account';

function App() {
  return (
    <div>
      <Router>
          <NavBar/>
          <Routes>
            <Route path="/" element={<Homepage />}/>
            <Route path="/projects" element={<Projects />}/>
            <Route path="/account" element={<Account />}/>
          </Routes>
      </Router>

    </div>
  )
}

export default App;