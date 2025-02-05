import { useState } from "react";
import CheckboxOrRadio from "./CheckboxOrRadio";

// eslint-disable-next-line react/prop-types
const CustomFormCreator = ({customFields}) => {
    
    return (
        <div>
                {customFields.map((customField, i) => {
                    if (customField[1] == "checkbox"){
                        const options = customField[2].map((opt, i)=>{ return (<CheckboxOrRadio
                                                                            key={"ch"+i} 
                                                                            type="checkbox"
                                                                            label={opt}
                                                                            value={false}
                                                                            onChange={null} />)}) 
                       return (
                        <div key={"inpt"+i}> 
                            <label htmlFor={customField[0]}> {customField[0]}</label>
                            {options}
                        </div>
                       ) 
                    }
                    if (customField[1] == "radio"){
                        const options = customField[2].map((opt, i)=>{ return (<CheckboxOrRadio
                                                                            key={"ch"+i} 
                                                                            type="radio"
                                                                            label={opt}
                                                                            name={opt}
                                                                            value={opt}
                                                                            checked={false}
                                                                            onChange={null} />)}) 
                       return (
                        <div key={"inpt"+i}> 
                            <label htmlFor={customField[0]}> {customField[0]}</label>
                            {options}
                        </div>
                       ) 
                    }else {
                        return(
                            <div key={"inpt"+i}>
                                <label htmlFor={customField[0]}  > {customField[0]} </label>
                                <input
                                    type={customField[1]}
                                    name={customField[0]}
                                    />
                            </div>
                        )

                    }
                })}
        </div>
    )
}

export default CustomFormCreator