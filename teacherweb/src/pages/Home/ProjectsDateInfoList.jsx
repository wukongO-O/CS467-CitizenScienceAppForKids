import React, { useState, useEffect } from 'react';
import studentData from '../../components/studentdata.json';

const ProjectsDateInfoList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(studentData.projects);
}, []);

  return (
    <div>
      <h2>Active Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.project_id}>
            <strong>{project.project_name}</strong>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsDateInfoList;