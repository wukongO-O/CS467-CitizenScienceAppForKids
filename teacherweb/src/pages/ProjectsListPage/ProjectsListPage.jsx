import React from "react";
import ProjectsList from './ProjectsList';
import { useNavigate } from "react-router-dom";
import Portal from "../../components/navigation/Portal";
import MyCalendar from "../../components/MyCalendar";

const ProjectsListPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Project List Page</h1> 
      <p>Here’s a quick overview of your active projects:</p>
      <ProjectsList />
      
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