import React from "react";
import ProjectsDateInfoList from './ProjectsDateInfoList';
import Portal from "../../components/navigation/Portal";
import MyCalendar from "../../components/MyCalendar";


const Homepage = () => {

  return (
    <div>
      <h1>Welcome Back, Teacher!</h1>
      <p>Here’s a quick overview of your active projects:</p>
      <ProjectsDateInfoList />
      <Portal>
          <MyCalendar/>
        </Portal>
    </div>
  );
};

export default Homepage;