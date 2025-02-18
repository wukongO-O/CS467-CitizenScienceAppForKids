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
      {/* Export CSV Button */}
      <button onClick={downloadCSV}>Export CSV</button>
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