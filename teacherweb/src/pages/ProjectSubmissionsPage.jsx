import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProject } from '../hooks/useProject';
import studentData from '../components/studentdata.json';
import Portal from '../components/navigation/Portal';
import MyCalendar from '../components/MyCalendar';
import PieChart from '../components/graphs/PieChart';


const ProjectSubmissionsPage = () => {
    //const [projects, setProjects] = useState([]);
    const {id} = useParams(); //getting the project id from the url
    const info = useProject(id);// getting the project information with custom hook, this returns information for the one project we need, including the observations list that is needed for this page

    
    if(!info){
      return <div className="loading">Loading...</div>
    }

    const observations = info.observations || [];

    // Convert data to CSV format
    const convertToCSV = (data) => {
      if (!data.length) return "";

      const headers = ["Project Name", "Due Date", "Student ID", "Date Completed"];
      const csvRows = [headers.join(",")];

      data.forEach((obs) => {
          const values = [
              `"${info.title}"`,
              `"${info.due_at}"`,
              `"${obs.student_id}"`,
              `"${obs.date_completed || 'N/A'}"`
          ];
          csvRows.push(values.join(","));
      });

      return csvRows.join("\n");
  };

  // Trigger CSV download
  const downloadCSV = () => {
    const csvContent = convertToCSV(observations);
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "observations_data.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

return (
    <div>
        <h1 style={{ marginBottom: '30px' }}>Project Observations - {info.title}</h1>

        {observations.length > 0 ? (
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Student ID</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Date Completed</th>
                    </tr>
                </thead>
                <tbody>
                    {observations.map((obs) => (
                        <tr key={obs.obs_id}>
                            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{obs.student_id}</td>
                            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{obs.date_completed || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
            <p>No observations submitted yet.</p>
        )}

        {/* Export using CSV button */}
        <button onClick={downloadCSV} style={{ marginTop: "10px", padding: "8px 12px" }}>
        Export Observations and Project Info to CSV
        </button>
  
        <Portal>
          <MyCalendar />
          <PieChart id={id} projectData={observations} />
        </Portal>
      </div>
    );
  };
    
    export default ProjectSubmissionsPage;