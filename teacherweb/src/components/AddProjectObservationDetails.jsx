import { useState } from "react"
import CustomFormCreator from "./CustomFormCreator";
import StepsList from "./OrderedList";

const AddProjectObservationDetails = () => {
    const [observations, setObservations] = useState();
    const [location, setLocation] = useState();
    const [customInputLabel, setCustomInputLabel]  = useState();
    const [customInputType, setCustomInputType] = useState("");
    const [customFields, setCustomFields] = useState([]);
    const [showAdditionalField, setShowAdditionalField] = useState(false);
    const [additionalFieldInfo, setAdditionalFieldInfo] = useState();
    const [customOptions, setCustomOptions] = useState([]);

    const handleCustomField = () => {
        switch(customInputType){
            case "checkbox":
            case "radio":
                if(customOptions.length == 0){
                    showAdditionalField ? alert("Please enter in at least one option for your input type") : setShowAdditionalField(true)
                } else{
                    setCustomFields([...customFields, [customInputLabel, customInputType, customOptions]])
                    setShowAdditionalField(false);
                    setCustomOptions([])
                    setAdditionalFieldInfo("")
                    setCustomInputLabel("")
                    setCustomInputType("")
                }
                break;
            default:
                setCustomFields([...customFields, [customInputLabel, customInputType]])
                setCustomInputLabel("")
                setCustomInputType("")
        }
    }

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
                            <option value="radio">Radio</option>
                            <option value="checkbox">Checkbox</option>
                            <option value="image">File</option>
                        </select>
                    <button
                        onClick={(e)=>{
                            e.preventDefault()
                            handleCustomField()    
                        }}> Add Field </button>
                    {/* the following should only show if the field type requires additional information from the user */}
                    {showAdditionalField ? 
                    <div id="additional-field">
                        <StepsList items={customOptions}/>
                        <label htmlFor="additonal-field-info">Option</label>
                        <input
                            name="additonal-field-info"
                            type="text"
                            value={additionalFieldInfo}
                            onChange={(e)=>setAdditionalFieldInfo(e.target.value)} />
                        <p className="small-text">Click Add Field when done entering all options</p>
                        <button 
                            type="submit"
                            onClick={(e)=>{
                                e.preventDefault()
                                setCustomOptions([...customOptions, additionalFieldInfo])
                                setAdditionalFieldInfo('')
                            }} > Save Option </button>
                    </div> : null }
                </div>
            </div>

        </form>
    )
}

export default AddProjectObservationDetails