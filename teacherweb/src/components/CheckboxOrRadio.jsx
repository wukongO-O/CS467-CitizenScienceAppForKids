
import { CiSquareRemove } from "react-icons/ci";

// eslint-disable-next-line react/prop-types
const CheckboxOrRadio = ({id, type, options, label, handleRemove}) => {

    return(
        <div className="check-rad-input-wrapper" id={id}>
            <label>{label}</label>
            <CiSquareRemove 
                className={handleRemove ? "icon" : "hide-icon"}
                onClick={() => handleRemove(id)}/>
                {options.map((opt, i)=>{
                    return(
                        <div className="check-rad" id={id} key={"cbrd"+i}>
                            <input
                                readOnly
                                type={type}
                                name={label.toLowerCase().replace(" ", "_")}
                                value={opt}
                                />
                                <label>{opt}</label>
                            </div>
                    )})
                }
        </div>
    )    
}

export default CheckboxOrRadio