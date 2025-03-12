import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddProjectMainInfo from "../components/projects/AddProjectMainInfo";
import AddProjectObservationDetails from "../components/projects/AddProjectObservationDetails";
import Portal from "../components/navigation/Portal";
import MyCalendar from "../components/MyCalendar";
import { useClassesInfo } from "../hooks/useClassesInfo";
import { useUserContext } from "../context/UserContext";

const AddProjectPage = () => {
    const {user} = useUserContext();
    const [view, setView] = useState("main");
    const [loading, setLoading] = useState(false);
    const [errorPosting, setErrorPosting] = useState(false);
    const [data, setData] = useState({teacher_id:user.id});
    const teacher_classes = useClassesInfo(user.id);
    const navigate = useNavigate();

    if(!teacher_classes || !user){
        return(<div className="main-container home">
        <p>Loading...</p>
      </div>)
    }

    const changeView = () => {
        setView("observations")
    }

    const mainInfoUpdate = (my_data) => {
        const new_data = {...data, ...my_data}
        setData(new_data)
    }

    const handleSubmit = async (form_definition) => {
        setData((data) => {
            const updatedData = {
              ...data,
              form_definition: form_definition, 
            };
            addProject(updatedData);
            return updatedData;
          });
    }

    //adds a project and gets back a code for the project
    async function addProject(payload){
        //while user waits for data to post and return code a 'loading' message will be shown
        setLoading(true);
        
        try{
        const dataToSend = {
            ...payload,
            directions: JSON.stringify(payload.directions) // Stringify only directions
        };

        const res = await fetch(import.meta.env.VITE_API_BASE_URL + `/projects`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend),
        });
            if (!res.ok){
                setErrorPosting(true);
                throw new Error ();
            }
            setErrorPosting(!errorPosting);
            const projectData = await res.json();
            setLoading(false);
            alert(`Project Created!`)
            navigate(`/projects`);
        } catch(err){
            console.log("There was an error adding the project")
        }
    }


    return(
        <div className="main-container">
            <div className="section-container">
            {errorPosting ? <p className="purple-txt">There was a problem submiting your request. Please try again</p>:null}
            {view == "main" ? 
                <AddProjectMainInfo 
                    changeView={changeView}
                    handleMainInfoUpdate={mainInfoUpdate}
                    teacher_classes={teacher_classes} /> :
                <AddProjectObservationDetails
                    handleSubmit={handleSubmit}/>
             }
            </div>
        <Portal>
            <MyCalendar/>
        </Portal>
        </div>
    )

}

export default AddProjectPage