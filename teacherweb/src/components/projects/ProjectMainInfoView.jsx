import OrderedList from "../OrderedList"

const ProjectMainInfoView = ({info, changeView}) => {
    
    return(
        <div className="project-view-main">
                <div className="full-width-section">
                <h3  className="section-subtitle">Project Description</h3>
                    <p className="rg-text">{info.description}</p>
                </div>
                <div>
                    <h3 className="section-subtitle">Class</h3>
                    <p className="rg-text">{info.project_class} 1</p>
                </div>
                <div>
                    <h3 className="section-subtitle">Start Date</h3>
                    <p className="rg-text">{info.start_date}</p>
                </div>
                <div>
                    <h3 className="section-subtitle">End Date</h3>
                    <p className="rg-text">{info.due_at}</p>
                </div>
                <div>
                    <h3 className="section-subtitle">Project Code</h3>
                    <p className="rg-text">{info.project_code}</p>
                </div>
                <div className="full-width-section">
                    <h3 className="section-subtitle">Steps</h3>
                    <p className="rg-text"><OrderedList items={info.directions}/></p>
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