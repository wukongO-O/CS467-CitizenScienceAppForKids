import { useState } from "react";
import CustomFormCreator from "../CustomFormCreator";


const ProjectObservationsFormView = ({form_definition, changeView}) => {
    const [editMode, setEditMode] = useState(false);

    return(
        <div className="observation-details-form">
            <div className="left-form-wrapper">
                <label htmlFor="observations">Observations</label>
                    <textarea
                            readOnly
                            name="observations" >
                    </textarea>
            </div>
            <div className="right-form-wrapper">
                <label htmlFor="location">Location</label>
                    <input 
                        readOnly
                        type="text" 
                        name="location" />
            </div>
            <div className="wide-form-wrapper">
                <CustomFormCreator 
                    fields={form_definition}
                    removeField={false}/>
            </div>
            <div>
                    <button
                            className="button"
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