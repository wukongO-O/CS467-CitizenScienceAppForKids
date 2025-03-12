import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProject } from '../hooks/useProject';
import studentData from '../components/studentdata.json';
import Portal from '../components/navigation/Portal';
import MyCalendar from '../components/MyCalendar';
import PieChart from '../components/graphs/PieChart';
import { useProjectObservations } from '../hooks/useProjectObservations';


const ProjectSubmissionsPage = () => {
    // const [obsData, setObsData] = useState([]);
    const [headers, setHeaders] = useState([]);

    const {id} = useParams(); //getting the project id from the url
    const project_info = useProject(id);// getting the project project_information with custom hook, this returns project_information for the one project we need, including the observations list that is needed for this page
    const observationsList = useProjectObservations(id, setHeaders)

    
    if(!project_info || !observationsList){
      return <div className="loading">Loading...</div>
    }

    // Convert data to CSV format
    const convertToCSV = (data) => {
      if (!data.length) return "";

      const default_headers = ["Project Name", "Due Date", "Student ID", "Date Completed"];
      const all_headers= [...default_headers,...headers];
      const csvRows = [all_headers.join(",")];
      
      data.forEach((obs) => {
        const form_values = Object.values(obs.data).map(value=>{
            if (typeof value == 'string'){
                value= value.replace(/"/g, '""');
                return `"${value}"`
            }
            return value;
        });
        const values = [
            `"${project_info.title}"`,
            `"${project_info.due_at}"`,
            `"${obs.anon_user_id}"`,
            `"${obs.timestamp || 'N/A'}"`,
            ...form_values
        ];
        
          csvRows.push(values.join(","));
      });

      return csvRows.join("\n");
  };

  // Trigger CSV download
  const downloadCSV = () => {
    const csvContent = convertToCSV(observationsList);
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
    <div className='main-container observations-list'>
        <h1 className='section-title'> {project_info.title}  </h1>
        <h3 className="section-subtitle">Students' Observations</h3>
        <p className='small-text'>Due: {new Date(project_info.due_at).toLocaleDateString().split(',')[0]}</p>
        {observationsList.length > 0 ? 
            <div className='observations-table'>
                {/* Export using CSV button */}
                <button onClick={downloadCSV} className='button medium extra-top-margin'>
                Export to CSV
                </button>
                <table >
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Date Completed</th>
                            {headers.map((header, i)=>{
                                return(                                   
                                    <th key={'header'+i}>{header}</th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {observationsList.map((obs) => (
                            <tr key={obs.obs_id}>
                                <td >{obs.anon_user_id}</td>
                                <td >{new Date(obs.timestamp).toLocaleDateString().split(',')[0] || 'N/A'}</td>
                                {Object.values(obs.data).map((value,i)=> <td key={"val"+i}>{value}</td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> : (
            <p className='subsection-container'>No observations submitted yet.</p>
        )}

  
        <Portal>
          <MyCalendar />
          <PieChart class_id={project_info.class.class_id} project_id={id}/>
        </Portal>
      </div>
    );
  };
    
    export default ProjectSubmissionsPage;