import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route, useParams} from 'react-router-dom';
import NavBar from './components/Navbar';
import LoginSignupPage from './pages/LoginSignup/LoginSignupPage';
import Homepage from './pages/Homepage';
import ProjectsPage from './pages/ProjectsPage';
import Account from './pages/Account';
import ProjectPage from './pages/ProjectPage';
import ProjectSubmissionsPage from './pages/ProjectSubmissionsPage';
import AddProjectPage from './pages/AddProjectPage';
import EditProjectPage from './pages/EditProjectPage';
import Calendar from './components/Calendar';

function App() {
  return (
    <div className='wrapper flow'>
      <Router>
          <NavBar/>
          <Routes>
            <Route path="/" element={<LoginSignupPage />}/>
            <Route path="/" element={<Homepage />}/>
            <Route path="/projects" element={<ProjectsPage />}/>
            <Route path="/account" element={<Account />}/>
            <Route path="/add" element={<AddProjectPage />}/>
            <Route path="/project" element={<ProjectPage />}/>
            <Route path="/project/:id/submissions" element={<ProjectSubmissionsPage />}/>
            <Route path="/edit/:id" element={<EditProjectPage />}/>
          </Routes>
      </Router>

      <div className = 'right-container'>
        <Calendar/>
      </div>

    </div>
  )
}

export default App;