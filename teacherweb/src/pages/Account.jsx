import React, { useState, useEffect } from "react";
import studentData from "../components/studentdata.json";

const Account = () => {
  const [teacherName, setTeacherName] = useState("");
  const [teacherClasses, setTeacherClasses] = useState([]);

  useEffect(() => {
    // Retrieve teacher's username
    const loggedInTeacher = localStorage.getItem("loggedInTeacher");
    setTeacherName(loggedInTeacher);

    // Find classes 
    if (loggedInTeacher) {
      const teacherClassesSet = new Set();
      
      studentData.projects.forEach((project) => {
        if (project.project_class) {
          teacherClassesSet.add(project.project_class);
        }
      });

      setTeacherClasses(Array.from(teacherClassesSet));
    }
  }, []);

  return (
    <div>
      <h2>Teacher Account</h2>
      {teacherName ? (
        <div>
          <p><strong>Username:</strong> {teacherName}</p>
          <h3>Assigned Classes:</h3>
          <ul>
            {teacherClasses.length > 0 ? (
              teacherClasses.map((className, index) => (
                <li key={index}>{className}</li>
              ))
            ) : (
              <p>No assigned classes found.</p>
            )}
          </ul>
        </div>
      ) : (
        <p>No teacher is logged in.</p>
      )}
    </div>
  );
};

export default Account;