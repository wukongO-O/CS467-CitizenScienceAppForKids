import React, { useState, useEffect } from 'react';
import studentData from '../../components/studentdata.json';

const ProjectsList = () => {
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
            <strong>Project Name:</strong> {project.title} <br />
            <strong>Class Name:</strong> {project.project_class} <br />
            <strong>Project Code:</strong> {project.project_id} <br />
            <strong>Start Date:</strong> {project.start_date} <br />
            <strong>Due Date:</strong> {project.due_at} <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsList;