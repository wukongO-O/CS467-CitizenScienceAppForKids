import { useClassInfo } from "../../hooks/useClassInfo"
import OrderedList from "../OrderedList"

const ProjectMainInfoView = ({info, changeView}) => {
    const project_class = useClassInfo(info.project_id);

    if (!project_class) {
        return( <div className="loading">Loading...</div>)
    }
    
    return(
        <div className="project-view-main">
                <div className="full-width-section">
                <h3  className="section-subtitle">Project Description</h3>
                    <p className="rg-text">{info.description}</p>
                </div>
                <div>
                    <h3 className="section-subtitle">Class</h3>
                    <p className="rg-text">{project_class.class_name}</p>
                </div>
                <div>
                    <h3 className="section-subtitle">Start Date</h3>
                    {/* <p className="rg-text">{info.start_date}</p> */}
                    <p className="rg-text">pending</p>
                </div>
                <div>
                    <h3 className="section-subtitle">End Date</h3>
                    {/* <p className="rg-text">{info.due_at}</p> */}
                    <p className="rg-text">pending</p>
                </div>

                <div className="full-width-section">
                    <h3 className="section-subtitle">Steps</h3>
                    <p className="rg-text"><OrderedList items={JSON.parse(info.directions)}/></p>
                </div>
                <div>
                    <button
                            className="button"
                            onClick={(e)=> {
                                e.preventDefault()
                                changeView("observations")}}>
                            Observations Form
                    </button>
                </div>

        </div>

    )

}

export default ProjectMainInfoView