
// eslint-disable-next-line react/prop-types
const CheckboxOrRadio = ({type, label, value, onChange}) => {
    return(
        <div className="check-rad">
            <input
                type={type} 
                id={label}
                name={label}
                checked={false}
                className="check"
                readOnly />
            <label htmlFor={label}>{label}</label>

        </div>
    )    
}

export default CheckboxOrRadio