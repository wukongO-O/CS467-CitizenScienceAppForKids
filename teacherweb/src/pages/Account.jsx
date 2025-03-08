import React from "react";
import useUser from "../hooks/useUser";
import Portal from "../components/navigation/Portal";
import MyCalendar from "../components/MyCalendar";

const Account = () => {
  const user = useUser();

  return (
    <div className="main-container">
      <div className="section-container account">
        <h1 className="section-title">Teacher's Profile</h1>
        {user ? (
          <div>
            <div>
              <h3 className="section-subtitle">Username:</h3> <p className="rg-text">{user.username}</p>
            </div>
            </div>
          ) : (
            <div>
          <p>No teacher is logged in.</p>
        </div> 
        )}
      </div>
      <Portal>
        <MyCalendar />
      </Portal>
    </div>
  );
};

export default Account;