import {useEffect, useState, useReducer} from "react";
import Portal from "../components/navigation/Portal";
import MyCalendar from "../components/MyCalendar";
import { useUserContext } from "../context/UserContext";
import {useClassesInfo} from "../hooks/useClassesInfo";
import CreateClassForm from "../components/CreateClassForm";
import { useNavigate } from "react-router";

const Account = () => {
  const {user} = useUserContext();
  const [localClasses, setLocalClasses]= useState([]);
  const classes = useClassesInfo(user.id, setLocalClasses);
  const [addClassForm, setAddClassForm] = useState(false);
  const [errorAddingClass, setErrorAddingClass] = useState(false);
  let navigate = useNavigate();



  if (!user || classes === null) {
    return (
      <div className="main-container home">
        <p>Loading...</p>
      </div>)
  }
  const handleClassSubmit = async (class_data) => { 
    try {
      const res = await fetch(import.meta.env.VITE_API_BASE_URL + `/classes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...class_data, teacher_id: user.id }), // Include teacher_id in the body
      });
      if (!res.ok) {
        setErrorAddingClass(true);
        throw new Error("Failed to add class");
      }
      const new_class = await res.json();
      setErrorAddingClass(false);
      setAddClassForm(false);
      alert("Added Class Successfully!")
      navigate("/");
    } catch (err) {
      setErrorAddingClass(true);
      console.error("Couldn't add new class:", err);
    }
  };

  const handleAddClassForm = () => {
    setAddClassForm(!addClassForm)
  }

  return (
    <div className="main-container" >
        <h1 className="section-title">Teacher's Profile</h1>
        <div className="section-container account-view">


              <div className="full-width-section">
                <h3 className="section-subtitle">Username:</h3> 
                <p className="rg-text">{user.username}</p>
              </div>
              <div className="full-width-section classes-list">
                <h3 className="section-subtitle">Classes:</h3> 
                <ul>
                  {classes.length > 0 ? classes.map((cls, i)=>{
                    return <li key={"cls"+i}>{cls.class_name}</li>
                  }):null}

                </ul>
              </div>
              <div className="full-width-section">
              <button 
                className="button medium"
                onClick= {handleAddClassForm}
              
              >Add New Class</button>
              </div>
              {errorAddingClass ? <p className="purple-txt full-width-section">There was an error adding your class. If this persists, contact your system administrator</p> : null}
              {addClassForm ? 
                <CreateClassForm onClassSubmit={handleClassSubmit}/> 
              : null } 

        
      </div>
      <Portal>
        <MyCalendar />
      </Portal>
    </div>
  );
};

export default Account;