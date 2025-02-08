import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router';
import NavBar from './components/Navbar';
import LoginSignupPage from './pages/LoginSignup/LoginSignupPage';
import Homepage from './pages/Homepage';
import ProjectsPage from './pages/ProjectsPage';
import Account from './pages/Account';
import AddProjectPage from './pages/AddProjectPage'

function App() {
  return (
    <div>
      <Router>
          <NavBar/>
          <Routes>
            <Route path="/" element={<LoginSignupPage />}/>
            <Route path="/" element={<Homepage />}/>
            <Route path="/projects" element={<ProjectsPage />}/>
            <Route path="/account" element={<Account />}/>
            <Route path="/add-project" element={<AddProjectPage />}/>
          </Routes>
      </Router>

    </div>
  )
}

export default App;