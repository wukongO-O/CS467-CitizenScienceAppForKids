import React, { useState, useEffect } from 'react';
import studentData from '../../components/studentdata.json';

const ProjectsDateInfoList = () => {
  const [projects, setProjects] = useState([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const [dueTodayCount, setDueTodayCount] = useState(0);
  const [dueFutureCount, setDueFutureCount] = useState(0);

  useEffect(() => {
    setProjects(studentData.projects);
    setTotalProjects(studentData.projects.length);

    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    let dueToday = 0;
    let dueFuture = 0;

    studentData.projects.forEach((project) => {
      const dueDate = new Date(project.due_at);
      dueDate.setHours(0, 0, 0, 0); 

      if (dueDate.getTime() === today.getTime()) {
        dueToday++;
      } else if (dueDate > today) {
        dueFuture++;
      }
    });

    setDueTodayCount(dueToday);
    setDueFutureCount(dueFuture);
  }, []);

  return (
    <div>
      <p>You have <strong>{totalProjects}</strong> active Projects </p>
      <div className='subsection-container purple'>
        <p><strong> {dueTodayCount} </strong> projects are due today</p>
      </div>
      <p><strong>Projects Due in the Future:</strong> {dueFutureCount}</p>
      
      <ul>
        {projects.map((project) => (
          <li key={project.project_id}>
            <strong>{project.project_name}</strong>
            <p><strong>Due Date:</strong> {project.due_at}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsDateInfoList;