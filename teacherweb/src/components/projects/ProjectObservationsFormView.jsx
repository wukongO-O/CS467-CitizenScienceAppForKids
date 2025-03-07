import { useState } from "react";
import CustomFormCreator from "../CustomFormCreator";


const ProjectObservationsFormView = ({form_definition, changeView}) => {
    const [editMode, setEditMode] = useState(false);

    return(
        <div className="observation-details-form view-page">

            <div className="wide-form-wrapper flow">
                {form_definition.length > 0 ? 
                <CustomFormCreator 
                    fields={form_definition}
                    removeField={false}/> : <p>No custom form for this project. </p>}
            </div>
            <div className="project-nav">
                    <button
                            className="button large "
                            onClick={(e)=> {
                                e.preventDefault()
                                changeView("main")}}>
                            Project Main Info
                    </button>
                </div>
        </div>
    )

}

export default ProjectObservationsFormView