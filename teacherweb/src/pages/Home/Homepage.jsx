import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import ProjectsDateInfoList from './ProjectsDateInfoList';
import Portal from "../../components/navigation/Portal";
import MyCalendar from "../../components/MyCalendar";
import studentData from '../../components/studentdata.json';


const Homepage = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setProjects(studentData.projects);;
  }, []);

  return (
    <div className="main-container home">
      <p className="section-subtitle">Hello  < span className="header"> Teacher!</span> </p>
      <div className="section-container">
        <ProjectsDateInfoList />
      </div>

      <button onClick={() => navigate("/add")} className="button">
      Add Project
      </button>

    <div className="section-container home-add-info">
    <p>Upcoming projects</p>
        <ul>
          {projects.length > 0 ? (
            projects.map((project) => (
              <li key={project.project_id}>
                <strong style={{ marginRight: "3px" }}>{project.title}</strong>
                <strong>Due Date:</strong>  {new Date(project.due_at).toLocaleDateString()}
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