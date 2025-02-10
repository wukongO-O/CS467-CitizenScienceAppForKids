import OrderedList from "../components/OrderedList";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ProjectMainInfoView from "../components/projects/ProjectMainInfoView";
import ProjectObservationsFormView from "../components/projects/ProjectObservationsFormView";

const Project = ({info, form}) => {
    const [currentView, setCurrentView] = useState("main");


    const changeView = () => {
        if(currentView == "main"){
            setCurrentView("observations")
        }else {
            setCurrentView("main")
        }
    }

    return(
        <div>
            <h1 className="header">Bird Census</h1>
            <div className="main-container">
                <div className="project-view">
                    {currentView == "main" ? 
                        <ProjectMainInfoView changeView={changeView} info={info}/> : 
                        <ProjectObservationsFormView changeView={changeView} form={form}/>
                    }
                        <div className="full-width-section project-nav">
                            <Link
                                className="button "
                                // to={`/project/${info.id}/submissions`}
                                to={`/`}
                                >
                                Submissions
                            </Link>
                            <Link 
                                className="button"
                                // to={`/edit/${info.id}`}
                                to={`/`}
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