import { useNavigate } from "react-router-dom";
import ProjectsDateInfoList from './ProjectsDateInfoList';
import Portal from "../../components/navigation/Portal";
import MyCalendar from "../../components/MyCalendar";
import { useProjects } from "../../hooks/useProjects";


const Homepage = () => {
  const projects = useProjects(1);
  const navigate = useNavigate();

  if(!projects){
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="main-container home">
      <p className="section-subtitle">Hello  < span className="header"> Teacher!</span> </p>
      <div className="section-container">
        <ProjectsDateInfoList projects={projects}/>
      </div>

      <button onClick={() => navigate("/add")} className="button medium extra-top-margin">
      Add New Project
      </button>

    <div className="section-container home-add-info">
    <p className="section-subtitle">Upcoming projects</p>
        <ul>
          {projects.length > 0 ? (
            projects.slice(0,3).map((project) => (
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