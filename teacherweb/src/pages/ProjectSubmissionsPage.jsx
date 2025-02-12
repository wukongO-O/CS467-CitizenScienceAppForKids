import React, { useState, useEffect } from 'react';
import studentData from '../components/studentdata.json';

const ProjectSubmissionsPage = () => {
    const [projects, setProjects] = useState([]);
  
    useEffect(() => {
      setProjects(studentData.projects);
    }, []);
  
    return (
        <div>
          <h2>Project Submissions</h2>
          {projects.map((project) => (
            <div key={project.project_id}>
              <h3>{project.project_name}</h3>
              <p><strong>Due Date:</strong> {project.due_date}</p>
    
              <h4>Student Submissions:</h4>
              {project.observations && project.observations.length > 0 ? (
                <ul>
                  {project.observations.map((obs) => (
                    <li key={obs.obs_id}>
                      <strong>Student ID:</strong> {obs.student_id}, 
                      <strong> Date Completed:</strong> {obs.date_completed || 'N/A'}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No observations submitted yet.</p>
              )}
            </div>
          ))}
        </div>
      );
    };
    
    export default ProjectSubmissionsPage;