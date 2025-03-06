
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