
import ProjectsList from './ProjectsList';
import { useNavigate } from "react-router-dom";
import Portal from "../../components/navigation/Portal";
import MyCalendar from "../../components/MyCalendar";
import { useProjects } from "../../hooks/useProjects";
import {useUserContext} from "../../context/UserContext";

const ProjectsListPage = () => {
  const navigate = useNavigate();
  const {user} = useUserContext();
  const {projects} = useProjects(user.id); 

  if(!projects || !user){
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="main-container projects-list">
      <ProjectsList  projects={projects}/>
      
      <Portal>
          <MyCalendar/>
      </Portal>
      <button onClick={() => navigate("/add")} className='button medium'>
      Add New Project
      </button>
    </div>
  );
};

export default ProjectsListPage;