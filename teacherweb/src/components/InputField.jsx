import { CiSquareRemove } from "react-icons/ci";

const InputField = ({label, id, name, type, onChange, handleRemove}) => {
    
    return (
        <div className="single-input-wrapper" id={id}>
            <label htmlFor={label}>{label}</label>
            <CiSquareRemove 
                onClick={() => handleRemove(id)}/>
            <input
                id={id}
                name={label}
                type={type}
                onChange={null}
            />
        </div>
    )
}

export default InputField;