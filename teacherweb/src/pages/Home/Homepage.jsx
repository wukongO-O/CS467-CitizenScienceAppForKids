import React from "react";
import { useNavigate } from "react-router-dom";
import ProjectsDateInfoList from './ProjectsDateInfoList';
import Portal from "../../components/navigation/Portal";
import MyCalendar from "../../components/MyCalendar";


const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="main-container home">
      <p className="section-subtitle">Hello  < span className="header"> Teacher!</span> </p>
      <div className="section-container">
        {/* <p>Here’s a quick overview of your active projects:</p> */}
        <ProjectsDateInfoList />
      </div>

      <button onClick={() => navigate("/add")} className="button">
      Add Project
      </button>

    <div className="section-container home-add-info">

    </div>


      <Portal>
          <MyCalendar/>
        </Portal>
    </div>
  );
};

export default Homepage;