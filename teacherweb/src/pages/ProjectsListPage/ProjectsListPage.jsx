
import ProjectsList from './ProjectsList';
import { useNavigate } from "react-router-dom";
import Portal from "../../components/navigation/Portal";
import MyCalendar from "../../components/MyCalendar";
import { useProjects } from "../../hooks/useProjects";
import { useClassesInfo } from '../../hooks/useClassesInfo';

const ProjectsListPage = () => {
  const navigate = useNavigate();
  const projects = useProjects(1); //this hsould be the teacher's id 

  if(!projects){
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="main-container">
      <h1>Project List Page</h1> 
      <p>Here’s a quick overview of your active projects:</p>
      <ProjectsList  projects={projects}/>
      
      <Portal>
          <MyCalendar/>
      </Portal>
      <button onClick={() => navigate("/add")} style={{ padding: "8px 12px", marginTop: "10px" }}>
      Add Project
      </button>
    </div>
  );
};

export default ProjectsListPage;