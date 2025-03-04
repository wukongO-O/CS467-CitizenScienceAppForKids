import PropTypes from 'prop-types';
import OrderedList from "../OrderedList";


const ProjectMainInfoView = ({info, changeView}) => {
    
    return(
        <div className="project-view-main">
                <div className="full-width-section">
                <h3  className="section-subtitle">Project Description</h3>
                    <p className="rg-text">{info.description}</p>
                </div>
                <div>
                    <h3 className="section-subtitle">Class</h3>
                    <p className="rg-text">{info.class.class_name}</p>
                </div>
                <div>
                    <h3 className="section-subtitle">Start Date</h3>
                    <p className="rg-text">{new Date(info.start_date).toLocaleDateString().split(',')[0]}</p>
                </div>
                <div>
                    <h3 className="section-subtitle">End Date</h3>
                    <p className="rg-text">{new Date(info.due_at).toLocaleDateString().split(',')[0]}</p>
                </div>

                <div className="full-width-section">
                    <h3 className="section-subtitle">Steps</h3>
                    {info.directions ? 
                    <p className="rg-text"><OrderedList items={info.directions}/></p>
                    : null}
                </div>
                <div>
                    <button
                            className="button large"
                            onClick={(e)=> {
                                e.preventDefault()
                                changeView("observations")}}>
                            Observations Form
                    </button>
                </div>

        </div>

    )

}

ProjectMainInfoView.propTypes = {
    info: PropTypes.object.isRequired,
    changeView : PropTypes.func.isRequired
}

export default ProjectMainInfoView