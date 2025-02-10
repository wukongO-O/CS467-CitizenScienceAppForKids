import { CiSquareRemove } from "react-icons/ci";

const InputField = ({label, id, name, type, handleRemove}) => {
    
    return (
        <div className="single-input-wrapper" id={id}>
            <label htmlFor={label}>{label}</label>
            <CiSquareRemove 
                className= {handleRemove ? "icon" : "hide-icon"}
                onClick={() => handleRemove(id)}/> 
            <input
                readOnly
                id={id}
                name={label}
                type={type}
            />
        </div>
    )
}

export default InputField;