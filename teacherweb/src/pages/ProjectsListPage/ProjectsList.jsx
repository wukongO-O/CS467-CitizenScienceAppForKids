import React, { useState, useEffect } from 'react';
import studentData from '../../components/studentdata.json';

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(studentData.projects);
}, []);

// Convert data to CSV format
const convertToCSV = (data) => {
  if (!data.length) return "";

  const headers = Object.keys(data[0]).filter(header => header !== "form_definition");
  const csvRows = [];

  // Add headers
  csvRows.push(headers.join(","));

  // Add rows
  for (const row of data) {
    const values = headers.map((header) => {
      let value = row[header];

      if (Array.isArray(value)) {
        return `"${value.map(item => (typeof item === 'object' ? JSON.stringify(item) : item)).join("; ")}"`;
      }

      // Handle objects 
      if (typeof value === "object" && value !== null) {
        return `"${JSON.stringify(value).replace(/"/g, '""')}"`; // Escape double quotes for CSV format
      }

      return `"${value}"`;
    });
    csvRows.push(values.join(","));
  }

  return csvRows.join("\n");
};

// Trigger CSV download
const downloadCSV = () => {
  const csvContent = convertToCSV(projects);
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "projects_data.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

return (
  <div>
    <h2>Active Projects</h2>
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>Project Name</th>
          <th>Class Name</th>
          <th>Project Code</th>
          <th>Start Date</th>
          <th>Due Date</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr key={project.project_id}>
            <td>{project.title}</td>
            <td>{project.project_class}</td>
            <td>{project.project_id}</td>
            <td>{project.start_date}</td>
            <td>{project.due_at}</td>
          </tr>
        ))}
      </tbody>
    </table>
    
    <button onClick={downloadCSV} style={{ marginTop: "10px", padding: "8px 12px" }}>
        Export Project Info to CSV
      </button>
  </div>
);
};

export default ProjectsList;