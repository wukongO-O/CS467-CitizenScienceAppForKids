import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/navigation/NavBar';
import LoginSignupPage from './pages/LoginSignup/LoginSignupPage';
import Homepage from './pages/Home/Homepage';
import Account from './pages/Account';
import ProjectPage from './pages/ProjectPage';
import ProjectSubmissionsPage from './pages/ProjectSubmissionsPage';
import AddProjectPage from './pages/AddProjectPage';
import EditProjectPage from './pages/EditProjectPage';
import ProjectsListPage from './pages/ProjectsListPage/ProjectsListPage';
import { useUserContext } from './context/UserContext';

function App() {
  const { user, logout } = useUserContext();

  // Remove isAuthenticated state and localStorage logic
  // const [isAuthenticated, setIsAuthenticated] = useState(
  //   localStorage.getItem('isAuthenticated') === 'true'
  // );

  // const handleLogin = () => {
  //   setIsAuthenticated(true);
  //   localStorage.setItem('isAuthenticated', 'true'); // Request login
  // };

  const handleLogout = () => {
    logout()
    // setIsAuthenticated(false);
    // localStorage.removeItem('isAuthenticated'); // Remove login
  };

  return (
    <div className="wrapper flow">
      <Router>
          <NavBar isAuthenticated={!!user} onLogout={handleLogout} /> 
          <Routes>
            <Route path="/" element={<LoginSignupPage />} /> 
            {/* Need to login to view any of the following pages */}
            <Route path="/homepage" element={user ? <Homepage /> : <Navigate to="/" />} />
            <Route path="/account" element={user ? <Account /> : <Navigate to="/" />} />
            <Route path="/add" element={user ? <AddProjectPage /> : <Navigate to="/" />} />
            <Route path="/project/:id" element={user ? <ProjectPage /> : <Navigate to="/" />} />
            <Route path="/project/:id/observations" element={user ? <ProjectSubmissionsPage /> : <Navigate to="/" />} />
            <Route path="/edit/:id" element={user ? <EditProjectPage /> : <Navigate to="/" />} />
            <Route path="/projects" element={user ? <ProjectsListPage /> : <Navigate to="/" />} />
          </Routes>

      </Router>
    </div>
  );
}

export default App;