import { useState } from "react";
import CustomFormCreator from "../CustomFormCreator";


const ProjectObservationsFormView = ({form, changeView}) => {
    const [editMode, setEditMode] = useState(false);

    let fields = [
        {
            type:"text",
            label:"Bird Species",
            name:"bird_species",
            required:true,

        },
        {
            type:"checkbox",
            label:"Weather Conditions",
            name:"weather_conditions",
            required:true,
            options:["rain", "hot", "humid", "cold"]
        },
        {
            type:"number",
            label:"Total Bird Count",
            name:"bird_count",
            required:true,
        },
        {
            type:"radio",
            label: "Color",
            name:"color",
            required:true,
            options:["blue", "red", "yellow", "brown"]
        }
    ]

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
                    fields={fields}
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