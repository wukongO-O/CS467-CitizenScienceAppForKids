import { useState } from "react";
import CheckboxOrRadio from "./CheckboxOrRadio";
import InputField from "./InputField";

// eslint-disable-next-line react/prop-types
const CustomFormCreator = ({customFields, removeField}) => {

    const handleRemove = (id) => {
        removeField(id)
    }
    
    return (
        <div id="custom-form-preview" >
            {customFields.map((inField, i) => {
                
                if(inField.customInputType == "checkbox" || inField.customInputType == "radio"){
                    return <CheckboxOrRadio
                                id = {i}
                                key={"inp"+i}
                                label = {inField.customInputLabel}
                                type={inField.customInputType}
                                options = {inField.customOptions}
                                onChange={null}
                                handleRemove={handleRemove}/>
                }
                else{
                    return <InputField 
                                id={i}
                                key={"inp"+i}
                                label = {inField.customInputLabel}
                                type={inField.customInputType}
                                onChange={null}
                                handleRemove={handleRemove}/>
                }
            })}
        </div>
    )
}

export default CustomFormCreator