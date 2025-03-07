import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import ProjectsDateInfoList from './ProjectsDateInfoList';
import Portal from "../../components/navigation/Portal";
import MyCalendar from "../../components/MyCalendar";
import { useProjects } from '../../hooks/useProjects';

const Homepage = () => {
  const navigate = useNavigate();
  const teacher_id = 1;
  const projects = useProjects(teacher_id); 

  return (
    <div className="main-container home">
      <p className="section-subtitle">Hello  < span className="header"> Teacher!</span> </p>
      <div className="section-container">
        <ProjectsDateInfoList teacher_id={teacher_id} />
      </div>

      <button onClick={() => navigate("/add")} className="button medium extra-top-margin">
      Add New Project
      </button>

    <div className="section-container home-add-info">
    <p className="section-subtitle">Upcoming projects</p>
        <ul>
          {projects && projects.length > 0 ? ( // Check if projects is not null before accessing length
            projects.map((project) => (
              <li key={project.project_id}>
                <p>{project.title}</p>
                <p className="purple-txt">Starting:  {new Date(project.start_date).toLocaleDateString()}</p>
              </li>
            ))
          ) : (
            <p>No upcoming projects</p>  // If there are no projects
          )}
        </ul>
    </div>
      <Portal>
          <MyCalendar/>
        </Portal>
    </div>
  );
};

export default Homepage;