import React, { useState, useEffect } from "react";
import studentData from "../components/studentdata.json";
import Portal from "../components/navigation/Portal";
import MyCalendar from "../components/MyCalendar";

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
    <div className="main-container">
      <div className="section-container account">
        <h1 className="section-title">Teacher's Profile</h1>
        {teacherName ? (
          <div>
            <div>
              <h3 className="section-subtitle">Username:</h3> <p className="rg-text">{teacherName}</p>
          </div>
          <div>
              <h3 className="section-subtitle">Assigned Classes:</h3>
              <ul>
                {teacherClasses.length > 0 ? (
                  teacherClasses.map((className, index) => (
                    <li key={index} className="rg-text">{className}</li>
                  ))
                ) : (
                  <p>No assigned classes found.</p>
                )}
              </ul>

          </div>
          </div>
        ) : (
          <p>No teacher is logged in.</p>
        )}

      </div>
      <Portal>
          <MyCalendar/>
      </Portal>
    </div>
  );
};

export default Account;