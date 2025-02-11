import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditProjectMainInfo from "../components/projects/EditProjectMainInfo";
import EditProjectObservationDetails from "../components/projects/EditProjectObservationDetails";

const EditProjectPage = () => {

        const [view, setView] = useState("main");
        const navigate = useNavigate();
        const {id} = useParams();

        const changeView = () => {
            if (view == "main"){
                setView("observations")
            }else{
                setView("main")
            }
        }

        const handleUpdate = (data) =>{
            navigate('/project')
        }
    
        return(
            <div className="main-container">
                {view == "main" ?
                    <EditProjectMainInfo 
                        currentData={null}
                        changeView={changeView}
                        handleUpdate={handleUpdate}/> :
                    <EditProjectObservationDetails
                        currentData={null}
                        changeView={changeView}
                        handleUpdate={handleUpdate}/>
                 }
            </div>
        )
}

export default EditProjectPage;