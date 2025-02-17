import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProject } from "../hooks/useProject";
import EditProjectMainInfo from "../components/projects/EditProjectMainInfo";
import EditProjectObservationDetails from "../components/projects/EditProjectObservationDetails";

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
                <h1 className="header">{info.title}</h1>
                <div className="main-container">
                    {view == "main" ?
                        <EditProjectMainInfo 
                            info={infoToDisplay}
                            changeView={changeView}
                            handleUpdate={handleUpdate}/> :
                        <EditProjectObservationDetails
                            form_definition={infoToDisplay.form_definition}
                            changeView={changeView}
                            handleUpdate={handleUpdate}/>
                    }
                </div>

            </div>
        )
}

export default EditProjectPage;