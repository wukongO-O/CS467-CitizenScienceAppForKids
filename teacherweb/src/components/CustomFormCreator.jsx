import { useState } from "react";
import CheckboxOrRadio from "./CheckboxOrRadio";
import InputField from "./InputField";

// eslint-disable-next-line react/prop-types
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
}

export default CustomFormCreator