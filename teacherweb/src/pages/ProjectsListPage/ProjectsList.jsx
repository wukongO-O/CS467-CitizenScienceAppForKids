import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import  PropTypes  from "prop-types";
import { useProjects } from '../../hooks/useProjects';

const ProjectsList = ({projects}) => {

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
  <div >
    <button onClick={downloadCSV} className='button medium'>
        Export to CSV
      </button>
    <table >
      <thead>
        <tr>
          <th>Project Name</th>
          <th>Class Name</th>
          <th>Start Date</th>
          <th>Due Date</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr key={project.project_id}>
            <td><Link to={`/project/${project.project_id}`}>{project.title}</Link></td>
            <td>{project.class_name}</td>
            <td>{new Date(project.start_date).toLocaleDateString().split(',')[0]}</td>
            <td>{new Date(project.due_at).toLocaleDateString().split(',')[0]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
};

ProjectsList.propTypes = {
  projects:PropTypes.array.isRequired
}

export default ProjectsList;