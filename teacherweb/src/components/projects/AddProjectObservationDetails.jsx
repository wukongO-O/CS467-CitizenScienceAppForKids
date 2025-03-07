import PropTypes from 'prop-types';
import { useState } from "react"
import CustomFormCreator from "../CustomFormCreator";
import OrderedList from "../OrderedList";

const AddProjectObservationDetails = ({handleSubmit}) => {
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
                    setCustomFields([...customFields, {label:customInputLabel, type:customInputType, name:customInputLabel.toLowerCase().replaceAll(" ", "_"), options:customOptions}])
                    setShowAdditionalField(false);
                    setCustomOptions([])
                    setAdditionalFieldInfo("")
                    setCustomInputLabel("")
                    setCustomInputType("text")
                }
                break;
            default:
                setCustomFields([...customFields, {label:customInputLabel, type:customInputType, name:customInputLabel.toLowerCase().replaceAll(" ", "_")}])
                setCustomInputLabel("")
                setCustomInputType("text")
        }
    }

    const deleteOption = (i) => {
        const newCustomOptions = [...customOptions.slice(0,i), ... customOptions.slice(i+1)];
        setCustomOptions(newCustomOptions)
    }

    const removeField = (id) => {
        const newCustomFields = [...customFields.slice(0,id), ...customFields.slice(id+1)]
        setCustomFields(newCustomFields)
    }

    const handleFormSubmit = () => {
        // submits form details to backend and generates code
        //adding observations textarea for all projects
        const form_w_observations = [...customFields, {label:'Observations', type:'textarea', name:'observations'}]
        handleSubmit(form_w_observations)
    }

    return(
        //observations textarea and location are the default fields
        <form 
            className="observation-details-form"
            onSubmit = {(e)=>{
                e.preventDefault()
                handleFormSubmit()    
            }}>
            <p className="small-text form-info"> Design your observation details form by selecting each input field.<br></br> Click 'Save Form and Publish' when done.</p>
            <div className="left-form-wrapper">
                <label htmlFor="observations">Observations</label>
                    <textarea 
                            name="observations" 
                            value={observations}
                            onChange= {(e) => setObservations(e.target.value)} >
                    </textarea>
            </div>
            {/* <div className="right-form-wrapper">
                <label htmlFor="location">Location</label>
                    <input 
                        type="text" 
                        name="location" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)} />
            </div> */}
            
            <div className="wide-form-wrapper flow" >
            {customFields.length>0? 
                <CustomFormCreator 
                    removeField={removeField}
                    fields={customFields} /> :null}
                <div className="observation-details-form">
                                        {/* the following should only show if the field type requires additional information from the user */}
                                        {showAdditionalField ? 
                    <div id="additional-field" className=" flow">
                        <OrderedList 
                            edit={true}
                            handleDelete={deleteOption}
                            items={customOptions}/>
                        <p className="small-text purple-txt">Click Add Field again when done entering options</p>
                        <label htmlFor="additonal-field-info">Option</label>
                        <input
                            id="additional-field-input"
                            name="additonal-field-info"
                            type="text"
                            value={additionalFieldInfo}
                            onChange={(e)=>setAdditionalFieldInfo(e.target.value)} />
                        <button 
                            type="submit"
                            className="no-background"
                            onClick={(e)=>{
                                e.preventDefault()
                                setCustomOptions([...customOptions, additionalFieldInfo])
                                setAdditionalFieldInfo('')
                            }} > Add Option </button>
                    </div> : null }
  
                        <div>
                            <label htmlFor="custom-input-label">Input Label</label>
                            <input
                                type="text"
                                name="custom-input-label"
                                value={customInputLabel}
                                onChange={(e) => setCustomInputLabel(e.target.value)} />
                                <button
                                    className="no-background"
                                    onClick={(e)=>{
                                        e.preventDefault()
                                        handleCustomField()    
                                    }}> Add Field </button>
                        </div>
                        <div>
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
                        
                    
                </div>
            </div>
            <button
                className="button large"
                type="submit"> Save Form and Publish </button>
        </form>
    )
}


AddProjectObservationDetails.propTypes = {
    handleSubmit: PropTypes.func.isRequired
}

export default AddProjectObservationDetails