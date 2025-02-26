import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddProjectMainInfo from "../components/projects/AddProjectMainInfo";
import AddProjectObservationDetails from "../components/projects/AddProjectObservationDetails";
import Portal from "../components/navigation/Portal";
import MyCalendar from "../components/MyCalendar";
import { useClassesInfo } from "../hooks/useClassesInfo";

const AddProjectPage = () => {
    const [view, setView] = useState("main");
    const [loading, setLoading] = useState(false);
    const [errorPosting, setErrorPosting] = useState(false);
    const [code, setCode] = useState(null);
    const [showCode, setShowCode] = useState(false);
    const [data, setData] = useState({teacher_id:1});
    const teacher_classes = useClassesInfo(1);
    const navigate = useNavigate();

    if(!teacher_classes){
        return <div className="loading">Loading...</div>
    }

    const changeView = () => {
        setView("observations")
    }

    const mainInfoUpdate = (my_data) => {
        const new_data = {...data, ...my_data}
        setData(new_data)
    }

    const handleSubmit = async (form_definition) => {
        const fullData = {...data, form_definition: JSON.stringify(form_definition)};
        setData(fullData);
        await addProject();
        setShowCode(true);
    }

    //adds a project and gets back a code for the project
    async function addProject(){
        //while user waits for data to post and return code a 'loading' message will be shown
        setLoading(true);
        console.log(data)
        try{
        const res = await fetch(`http://127.0.0.1:5000/projects`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });
            if (!res.ok){
                setError(true);
                throw new Error ()
            }
            debugger
            const responseCode = await res.json();
            setCode(responseCode);
            setLoading(false);
            alert(`Project Created!, here is your code ${responseCode}`)
            navigate(`/`);
        } catch(err){
            console.log("There was an error adding the project")
        }
    }


    return(
        <div className="main-container">
            {view == "main" ? 
                <AddProjectMainInfo 
                    changeView={changeView}
                    handleMainInfoUpdate={mainInfoUpdate}
                    teacher_classes={teacher_classes} /> :
                <AddProjectObservationDetails
                    handleSubmit={handleSubmit}/>
             }
        <Portal>
            <MyCalendar/>
        </Portal>
        </div>
    )

}

export default AddProjectPage