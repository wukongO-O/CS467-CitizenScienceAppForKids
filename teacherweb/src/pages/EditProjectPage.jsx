import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProject } from "../hooks/useProject";
import EditProjectMainInfo from "../components/projects/EditProjectMainInfo";
import EditProjectObservationDetails from "../components/projects/EditProjectObservationDetails";
import Portal from "../components/navigation/Portal";
import MyCalendar from "../components/MyCalendar";

const EditProjectPage = () => {
        const [infoToDisplay, setInfoToDisplay] = useState([]);
        const [loading, setLoading] = useState(false);
        const [view, setView] = useState("main");
        const {id} = useParams();
        const info = useProject(id, setInfoToDisplay);
        const [data, setData] = useState({teacher_id:1});
        const navigate = useNavigate();
        const [updatedData, setupdatedData] = useState();

        if(!info){
            return <div className="loading">Loading...</div>
        }
        const changeView = (data) => {
            if (view == "main"){
                let newUpdatedData = {...infoToDisplay, ...data};
                setInfoToDisplay(newUpdatedData);
                
                setView("observations")
            }else{
                                
                setInfoToDisplay((infoToDisplay)=>({
                    ...infoToDisplay, 
                    form_definition: data}),setView("main"));
                
            }
        }

        const handleUpdate = async (updateForm, form_definition ) => {
            if(updateForm) {
                setData((data) => {
                  const updatedData = {
                    ...data,
                    ...infoToDisplay,
                    form_definition: form_definition
                  };
                  updatedProject(updatedData);
                  return updatedData;
                });
            }else{
                setData((data) => {
                    const updatedData = {
                      ...data,
                      ...infoToDisplay
                    };
                    updatedProject(updatedData);
                    return updatedData;
                  });
            }
          };

        async function updatedProject (new_data) {
            //while user waits for data to post and return code a 'loading' message will be shown
            setLoading(true);
            try{
                const dataToSend = {
                    ...new_data,
                    directions: JSON.stringify(new_data.directions) // Stringify only directions
                };
                
                const res = await fetch(`http://127.0.0.1:5000/projects/${id}`, {
                method: "PUT",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataToSend),
            });
                if (!res.ok){
                    throw new Error ()
                }
                
                const projectData = await res.json();
                setLoading(false);
                alert(`Project Updated!`)
                navigate(`/project/${id}`);
            } catch(err){
                console.log("There was an error adding the project")
            }
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
                            form_definition={infoToDisplay.form_definition}
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