import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProject } from '../hooks/useProject';
import studentData from '../components/studentdata.json';
import Portal from '../components/navigation/Portal';
import MyCalendar from '../components/MyCalendar';
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
        <h1 style={{ marginBottom: '30px' }}>Project Submissions</h1>
  
        {projects.some(project => project.observations && project.observations.length > 0) ? (
          <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '8px', textAlign: 'left' }}>Project Name</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Due Date</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Student ID</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Date Completed</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) =>
                project.observations && project.observations.length > 0
                  ? project.observations.map((obs) => (
                      <tr key={obs.obs_id}>
                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{project.title}</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{project.due_at}</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{obs.student_id}</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{obs.date_completed || 'N/A'}</td>
                      </tr>
                    ))
                  : null
              )}
            </tbody>
          </table>
        ) : (
          <p>No observations submitted yet.</p>
        )}
  
        <Portal>
          <MyCalendar />
          <PieChart id={id} projectData={info.observations} />
        </Portal>
      </div>
    );
  };
    
    export default ProjectSubmissionsPage;