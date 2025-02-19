import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import NavBar from './components/navigation/NavBar';
import LoginSignupPage from './pages/LoginSignup/LoginSignupPage';
import Homepage from './pages/Home/Homepage';
import ProjectsPage from './pages/ProjectsPage';
import Account from './pages/Account';
import ProjectPage from './pages/ProjectPage';
import ProjectSubmissionsPage from './pages/ProjectSubmissionsPage';
import AddProjectPage from './pages/AddProjectPage';
import EditProjectPage from './pages/EditProjectPage';
import MyCalendar from './components/MyCalendar';
import ProjectsListPage from './pages/ProjectsListPage/ProjectsListPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true'); // Request login
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); // Remove login 
  };



  return (
    <div className='wrapper flow'>
      <Router>
          <NavBar isAuthenticated={isAuthenticated} onLogout={handleLogout}/>
          <Routes>
            <Route path="/" element={<LoginSignupPage onAuthSuccess={handleLogin} />} />

              {/*Need to login to view any of the following pages */}
              <Route path="/homepage" element={isAuthenticated ? <Homepage /> : <Navigate to ="/" />} />
              <Route path="/account" element={isAuthenticated ? <Account /> : <Navigate to="/" />} />
              <Route path="/add" element={isAuthenticated ? <AddProjectPage /> : <Navigate to="/" />} />
              <Route path="/project/:id" element={isAuthenticated ? <ProjectPage /> : <Navigate to="/" />} />
              <Route path="/project/:id/observations" element={isAuthenticated ? <ProjectSubmissionsPage /> : <Navigate to="/" />} />
              <Route path="/edit/:id" element={isAuthenticated ? <EditProjectPage /> : <Navigate to="/" />} />
              <Route path="/projects" element={isAuthenticated ? <ProjectsListPage /> : <Navigate to="/" />} />
          </Routes>
      </Router>


    </div>
  );
}

export default App;