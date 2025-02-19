import React, { useState, useEffect } from 'react';
import {createPortal} from 'react-dom';
import { useParams } from 'react-router-dom';
import { useProject } from '../hooks/useProject';
import studentData from '../components/studentdata.json';
import PieChart from '../components/graphs/PieChart';


const ProjectSubmissionsPage = () => {
    const [projects, setProjects] = useState([]);
    const {id} = useParams(); //getting the project id from the url
    const info = useProject(id);// getting the project information with custom hook, this returns information for the one project we need, including the observations list that is needed for this page

    
    useEffect(() => {
      setProjects(studentData.projects);
    }, []);
    
    if(!info){
      return <div className="loading">Loading...</div>
    }
    return (
        <div>
          <h2>Project Submissions</h2>
          {projects.map((project) => (
            <div key={project.project_id}>
              <h3>{project.title}</h3>
              <p><strong>Due Date:</strong> {project.due_at}</p>
    
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
            {createPortal (
              <PieChart id={id} projectData={info.observations}/>
          , document.getElementById("additional-page-content"))}
        </div>
      );
    };
    
    export default ProjectSubmissionsPage;