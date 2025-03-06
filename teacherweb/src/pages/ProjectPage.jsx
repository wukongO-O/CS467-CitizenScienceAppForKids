import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useProject } from "../hooks/useProject";
import Portal from "../components/navigation/Portal";
import ProjectMainInfoView from "../components/projects/ProjectMainInfoView";
import ProjectObservationsFormView from "../components/projects/ProjectObservationsFormView";
import PieChart from "../components/graphs/PieChart";
import MyCalendar from "../components/MyCalendar";

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
            <div className="main-container project">
            <h3 className="section-title">{info.title}</h3>
            <Link 
                    className="button medium"
                    to={`/edit/${id}`}
                    >
                    Edit Project
                </Link>
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
                                className="button large"
                                to={`/project/${id}/observations`}>
                                See Students' Observations
                            </Link>

                        </div>
                    </div>
                </div>
                <Portal>
                    <MyCalendar/>
                    <PieChart id={info.class.class_id} />
                </Portal>

        </div>
    )
}

export default Project