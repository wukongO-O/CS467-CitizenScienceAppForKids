import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProject } from "../hooks/useProject";
import EditProjectMainInfo from "../components/projects/EditProjectMainInfo";
import EditProjectObservationDetails from "../components/projects/EditProjectObservationDetails";
import Portal from "../components/navigation/Portal";
import MyCalendar from "../components/MyCalendar";

const EditProjectPage = () => {
        const [infoToDisplay, setInfoToDisplay] = useState([]);
        const [view, setView] = useState("main");
        const {id} = useParams();
        const info = useProject(id, setInfoToDisplay);
        const navigate = useNavigate();
        const [updatedData, setupdatedData] = useState();

        const changeView = (data) => {
            if (view == "main"){
                let newUpdatedData = {...infoToDisplay, ...data};
                setInfoToDisplay(newUpdatedData);
                setView("observations")
            }else{
                const form_definiton_values = {form_definition:data}
                let newUpdatedData = {...infoToDisplay, ...form_definiton_values};
                setInfoToDisplay(newUpdatedData);
                setView("main")
            }
        }

        const handleUpdate = (data) =>{
            navigate('/projects')
        }

        if(!info){
            return <div className="loading">Loading...</div>
        }
    
        return(
            <div>
                <div className="main-container">
                <h3 className="section-title">{info.title}</h3>
                <div className="project-view">
                    {view == "main" ?
                        <EditProjectMainInfo 
                            info={infoToDisplay}
                            changeView={changeView}
                            handleUpdate={handleUpdate}/> :
                        <EditProjectObservationDetails
                            form_definition={infoToDisplay.form_definition.form_definition}
                            changeView={changeView}
                            handleUpdate={handleUpdate}/>
                    }

                </div>
                </div>
            <Portal>
                <MyCalendar/>
            </Portal>
            </div>
        )
}

export default EditProjectPage;