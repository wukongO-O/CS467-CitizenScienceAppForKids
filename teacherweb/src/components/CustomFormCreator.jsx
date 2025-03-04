import PropTypes from 'prop-types';
import CheckboxOrRadio from "./CheckboxOrRadio";
import InputField from "./InputField";

const CustomFormCreator = ({fields, removeField}) => {
    
    const handleRemove = (id) => {
        removeField(id)
    }
    
    return (
        <div id="custom-form-preview" >
            {fields.map((inField, i) => {
                
                if(inField.type == "checkbox" || inField.type == "radio"){
                    return <CheckboxOrRadio
                                id = {i}
                                key={"inp"+i}
                                label = {inField.label}
                                type={inField.type}
                                options = {inField.options}
                                handleRemove={removeField ? handleRemove : false}/>
                }
                else{
                    return <InputField 
                                id={i}
                                key={"inp"+i}
                                label = {inField.label}
                                type={inField.type}
                                onChange={null}
                                handleRemove={removeField ? handleRemove : false}/>
                }
            })}
        </div>
    )
};


CustomFormCreator.propTypes = {
    fields: PropTypes.array,
    removeField: PropTypes.func
};


export default CustomFormCreator