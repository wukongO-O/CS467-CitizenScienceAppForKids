import React from "react";
import ProjectsDateInfoList from './ProjectsDateInfoList';

const Homepage = () => {

  return (
    <div>
      <h1>Welcome Back, Teacher!</h1>
      <p>Here’s a quick overview of your active projects:</p>
      <ProjectsDateInfoList />
    </div>
  );
};

export default Homepage;