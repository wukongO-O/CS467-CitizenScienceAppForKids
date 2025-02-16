import { useState } from "react"
import CustomFormCreator from "../CustomFormCreator";
import OrderedList from "../OrderedList";

const EditProjectObservationDetails = ({form_definition, changeView, handleUpdate}) => {
    const [observations, setObservations] = useState();
    const [location, setLocation] = useState();
    const [customInputLabel, setCustomInputLabel]  = useState();
    const [customInputType, setCustomInputType] = useState("text");
    const [customFields, setCustomFields] = useState(form_definition);
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

    const handleChangeView = () => {
        const form_definition = customFields;
        changeView(form_definition)
    }

    const removeField = (id) => {
        const newCustomFields = [...customFields.slice(0,id), ...customFields.slice(id+1)]
        setCustomFields(newCustomFields)
    }

    const deleteOption = (i) => {
        const newCustomOptions = [...customOptions.slice(0,i), ... customOptions.slice(i+1)];
        setCustomOptions(newCustomOptions)
    }

    const onEdit = () => {
        const data = {fields:customFields}
        handleUpdate(data)
        // submits form details to backend to update form
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
                    <p className="small-text"> Click 'Save Changes' when done editing your observations form.</p>
                <div className="observation-details-form">
                {/* the following should only show if the field type requires additional information from the user */}
                {showAdditionalField ? 
                    <div id="additional-field" className="flow">
                        <OrderedList 
                            edit={true}
                            handleDelete={deleteOption}
                            items={customOptions}/>
                        <p className="small-text">Click Add Field again when done entering options</p>
                        <label htmlFor="additonal-field-info">Option</label>
                        <input
                            id="additional-field-input"
                            name="additonal-field-info"
                            type="text"
                            value={additionalFieldInfo}
                            onChange={(e)=>setAdditionalFieldInfo(e.target.value)} />
                        <button 
                            type="submit"
                            name="additional-field-info"
                            className="button"
                            onClick={(e)=>{
                                e.preventDefault()
                                setCustomOptions([...customOptions, additionalFieldInfo])
                                setAdditionalFieldInfo('')
                            }} > Add Option </button>
                    </div> : null }
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
                            <option value="checkbox">Time</option>
                            {/* <option value="image">File</option>  stretch goal*/}
                        </select>
                        </div>

                </div>
            </div>
                <button 
                        type="submit" 
                        className="button"
                        onClick={(e)=>{
                            e.preventDefault();
                            handleChangeView();
                            }}>Main Info</button>
                    <button
                    className="button"
                    onClick={(e)=>{
                        e.preventDefault()
                        onEdit()    
                    }}> Save Changes </button>
        </form>
    )
}

export default EditProjectObservationDetails