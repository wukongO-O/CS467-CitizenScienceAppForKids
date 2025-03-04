import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProject } from "../hooks/useProject";
import { useClassesInfo } from "../hooks/useClassesInfo";
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
        const teacher_classes = useClassesInfo(1);
        const navigate = useNavigate();
        const [updatedData, setupdatedData] = useState();

        if(!info){
            return <div className="loading">Loading...</div>
        }

        const changeView = (data) => {
            if (view == "main"){
                debugger
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

        const handleUpdate = async (form_definition) =>{
            // navigate('/projects')
            const fullData = {...data, ...infoToDisplay, form_definition: JSON.stringify(form_definition)};
            setData(fullData);
            debugger
            await updatedProject();
        }

        async function updatedProject () {
            //while user waits for data to post and return code a 'loading' message will be shown
            setLoading(true);
            debugger
            try{
            const res = await fetch(`http://127.0.0.1:5000/projects/${id}`, {
                method: "PUT",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            });
                if (!res.ok){
                    throw new Error ()
                }
                
                const projectData = await res.json();
                setLoading(false);
                alert(`Project Created!`)
                navigate(`/projects`);
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
                            teacher_classes={teacher_classes}
                            changeView={changeView}
                            handleUpdate={handleUpdate}/> :
                        <EditProjectObservationDetails
                            form_definition={info.form_definition.form_definition}
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