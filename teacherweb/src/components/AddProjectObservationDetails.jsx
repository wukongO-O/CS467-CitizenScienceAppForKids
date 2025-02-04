import { useState } from "react"
import CustomFormCreator from "./CustomFormCreator";

const AddProjectObservationDetails = () => {
    const [observations, setObservations] = useState();
    const [location, setLocation] = useState();
    const [customInputLabel, setCustomInputLabel]  = useState();
    const [customInputType, setCustomInputType] = useState("");
    const [customFields, setCustomFields] = useState([])

    return(
        <form id="observation-details">
            <div className="left-add-project-form">
                <label htmlFor="observations">Observations</label>
                    <textarea 
                            name="observations" 
                            value={observations}
                            onChange= {(e) => setObservations(e.target.value)} >
                    </textarea>
            </div>
            <div className="right-add-project-form">
                <label htmlFor="location">Location</label>
                    <input 
                        type="text" 
                        name="location" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div id="custom-form-fields">
                <CustomFormCreator 
                    customFields={customFields} />
                <div>
                    <label htmlFor="custom-input-label">Input Label</label>
                        <input
                            type="text"
                            name="custom-input-label"
                            value={customInputLabel}
                            onChange={(e) => setCustomInputLabel(e.target.value)} />
                    <label htmlFor="custom-input-type">Input Type</label>
                        <select 
                            name="custom-input-type" 
                            value={customInputType}
                            onChange={(e)=>setCustomInputType(e.target.value)} >
                            <option value="text">Text</option>
                            <option value="date">Date</option>
                            <option value="number">Number</option>
                            <option value="checkbox">Checkbox</option>
                            <option value="image">Image</option>
                        </select>
                    <button
                        onClick={(e)=>{
                            e.preventDefault()
                            setCustomFields([...customFields, [customInputLabel, customInputType]])
                            setCustomInputLabel("")
                            setCustomInputType("")
                        }}> Add Field </button>
                </div>
            </div>

        </form>
    )
}

export default AddProjectObservationDetails