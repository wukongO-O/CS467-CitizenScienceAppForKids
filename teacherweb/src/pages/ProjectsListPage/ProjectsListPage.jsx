import React from "react";
import ProjectsList from './ProjectsList';

const ProjectsListPage = () => {

  return (
    <div>
      <h1>Project List Page</h1> 
      <p>Here’s a quick overview of your active projects:</p>
      <ProjectsList />
    </div>
  );
};

export default ProjectsListPage;