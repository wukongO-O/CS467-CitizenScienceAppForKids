import { useState } from "react"
import CustomFormCreator from "../CustomFormCreator";
import OrderedList from "../OrderedList";

const AddProjectObservationDetails = () => {
    const [observations, setObservations] = useState();
    const [location, setLocation] = useState();
    const [customInputLabel, setCustomInputLabel]  = useState();
    const [customInputType, setCustomInputType] = useState("text");
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
                    setCustomFields([...customFields, {label:customInputLabel, type:customInputType, options:customOptions}])
                    setShowAdditionalField(false);
                    setCustomOptions([])
                    setAdditionalFieldInfo("")
                    setCustomInputLabel("")
                    setCustomInputType("text")
                }
                break;
            default:
                setCustomFields([...customFields, {label:customInputLabel, type:customInputType}])
                setCustomInputLabel("")
                setCustomInputType("text")
        }
    }

    const removeField = (id) => {
        const newCustomFields = [...customFields.slice(0,id), ...customFields.slice(id+1)]
        setCustomFields(newCustomFields)
    }

    const handleFormSubmit = () => {
        // submits form details to backend and generates code
    }

    return(
        <form className="observation-details-form">
            <div className="left-form-wrapper">
                <label htmlFor="observations">Observations</label>
                    <textarea 
                            name="observations" 
                            value={observations}
                            onChange= {(e) => setObservations(e.target.value)} >
                    </textarea>
            </div>
            <div className="right-form-wrapper">
                <label htmlFor="location">Location</label>
                    <input 
                        type="text" 
                        name="location" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)} />
            </div>
            
            <div className="wide-form-wrapper flow" >
            {customFields.length>0? 
                <CustomFormCreator 
                    removeField={removeField}
                    fields={customFields} /> :null}
                    <p className="small-text"> Design your observation details form by selecting each input field. Click 'Save Form and Publish' when done.</p>
                <div className="observation-details-form">
                    <div className="left-form-wrapper">
                        <label htmlFor="custom-input-label">Input Label</label>
                        <input
                            type="text"
                            name="custom-input-label"
                            value={customInputLabel}
                            onChange={(e) => setCustomInputLabel(e.target.value)} />
                        <button
                            className="button"
                            onClick={(e)=>{
                                e.preventDefault()
                                handleCustomField()    
                            }}> Add Field </button>
                    </div>
                    <div className="right-form-wrapper">
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
                            {/* <option value="image">File</option>  stretch goal*/}
                        </select>
                        </div>
                    {/* the following should only show if the field type requires additional information from the user */}
                    {showAdditionalField ? 
                    <div id="additional-field" className="flow">
                        <OrderedList items={customOptions}/>
                        <p className="small-text">Click Add Field again when done entering options</p>
                        <label htmlFor="additonal-field-info">Option</label>
                        <input
                            name="additonal-field-info"
                            type="text"
                            value={additionalFieldInfo}
                            onChange={(e)=>setAdditionalFieldInfo(e.target.value)} />
                        <button 
                            type="submit"
                            className="button"
                            onClick={(e)=>{
                                e.preventDefault()
                                setCustomOptions([...customOptions, additionalFieldInfo])
                                setAdditionalFieldInfo('')
                            }} > Add Option </button>
                    </div> : null }
                </div>
            </div>
            <button
                className="button"
                onClick={(e)=>{
                    e.preventDefault()
                    handleFormSubmit()    
                }}> Save Form and Publish </button>
        </form>
    )
}

export default AddProjectObservationDetails