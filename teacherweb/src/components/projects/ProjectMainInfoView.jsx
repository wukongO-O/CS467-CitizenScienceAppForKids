import OrderedList from "../OrderedList"

const ProjectMainInfoView = ({info, changeView}) => {
    
    return(
        <div className="project-view-main">
                <div className="full-width-section">
                <h3  className="section-subtitle">Project Description</h3>
                    <p className="rg-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 1  ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                </div>
                <div>
                    <h3 className="section-subtitle">Class</h3>
                    <p className="rg-text">Biology 1</p>
                </div>
                <div>
                    <h3 className="section-subtitle">Start Date</h3>
                    <p className="rg-text">11/15/2025</p>
                </div>
                <div>
                    <h3 className="section-subtitle">End Date</h3>
                    <p className="rg-text">12/01/2025</p>
                </div>
                <div>
                    <h3 className="section-subtitle">Project Code</h3>
                    <p className="rg-text">35DEPT</p>
                </div>
                <div className="full-width-section">
                    <h3 className="section-subtitle">Steps</h3>
                    <p className="rg-text"><OrderedList items={["Lorem ipsum dolor sit amet.", "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."]}/></p>
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