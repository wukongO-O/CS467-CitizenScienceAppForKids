import {NavLink} from "react-router-dom";

const NavBar = ({isAuthenticated, onLogout}) => {
    return(
        <div className="side-nav">
            <div className='logo'>
                <h1 className='main-header'>CITIZEN SCIENCE</h1>
                <h3 className='purple-header'> Teacher's Portal</h3>
            </div>

            <nav>
                <NavLink to='/homepage'>
                Home
                </NavLink>
                <NavLink to='/projects'>
                Projects
                </NavLink>
                <NavLink to='/account'>
                Account
                </NavLink>
                {/* Show logout button only if user is authenticated */}
                {isAuthenticated && (
                    <button onClick={onLogout} className="logout-button">
                        Logout
                    </button>
                )}
            </nav>
        </div>
    );
};

export default NavBar;