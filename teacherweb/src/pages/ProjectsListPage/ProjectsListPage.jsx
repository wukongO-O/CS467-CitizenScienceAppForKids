import React from "react";
import ProjectsList from './ProjectsList';
import Portal from "../../components/navigation/Portal";
import MyCalendar from "../../components/MyCalendar";

const ProjectsListPage = () => {

  return (
    <div>
      <h1>Project List Page</h1> 
      <p>Here’s a quick overview of your active projects:</p>
      <ProjectsList />
      
      <Portal>
          <MyCalendar/>
      </Portal>
    </div>
  );
};

export default ProjectsListPage;