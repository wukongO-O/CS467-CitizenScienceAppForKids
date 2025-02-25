import React from "react";
import { useNavigate } from "react-router-dom";
import ProjectsDateInfoList from './ProjectsDateInfoList';
import Portal from "../../components/navigation/Portal";
import MyCalendar from "../../components/MyCalendar";


const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome Back, Teacher!</h1>
      <p>Here’s a quick overview of your active projects:</p>
      <ProjectsDateInfoList />
      <Portal>
          <MyCalendar/>
        </Portal>
        <button onClick={() => navigate("/add")} style={{ padding: "8px 12px", marginTop: "10px" }}>
        Add Project
        </button>
    </div>
  );
};

export default Homepage;