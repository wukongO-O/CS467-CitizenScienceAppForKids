import OrderedList from "../components/OrderedList";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import ProjectMainInfoView from "../components/projects/ProjectMainInfoView";
import ProjectObservationsFormView from "../components/projects/ProjectObservationsFormView";
import { useProject } from "../hooks/useProject";

const Project = () => {
    const [currentView, setCurrentView] = useState("main");
    const {id} = useParams();
    const info = useProject(id);
    
    const changeView = () => {
        if(currentView == "main"){
            setCurrentView("observations")
        }else {
            setCurrentView("main")
        }
    }

    if(!info){
        return <div className="loading">Loading...</div>
    }
    
    return(
        <div>
            <h1 className="header">{info.title}</h1>
            <div className="main-container">
                <div className="project-view">
                    {currentView == "main" ? 
                        <ProjectMainInfoView 
                            changeView={changeView} 
                            info={info}/> : 
                        <ProjectObservationsFormView 
                            changeView={changeView} 
                            form_definition={info.form_definition}/>
                    }
                        <div className="full-width-section project-nav">
                            <Link
                                className="button "
                                to={`/project/${id}/submissions`}>
                                Submissions
                            </Link>
                            <Link 
                                className="button"
                                to={`/edit/${id}`}
                                >
                                Edit Project
                            </Link>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Project