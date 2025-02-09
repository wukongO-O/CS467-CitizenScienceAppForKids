
import { CiSquareRemove } from "react-icons/ci";

// eslint-disable-next-line react/prop-types
const CheckboxOrRadio = ({id, type, options, label, onChange, handleRemove}) => {

    return(
        <div className="check-rad-input-wrapper" id={id}>
            <label>{label}</label>
                <CiSquareRemove 
                    onClick={() => handleRemove(id)}/>
                {options.map((opt, i)=>{
                    return(
                        <div className="check-rad" id={id} key={"cbrd"+i}>
                            <input
                                type={type}
                                label={opt}
                                value={opt}
                                onChange={onChange}
                                />
                                <label>{opt}</label>
                            </div>
                    )})
                }
        </div>
    )    
}

export default CheckboxOrRadio