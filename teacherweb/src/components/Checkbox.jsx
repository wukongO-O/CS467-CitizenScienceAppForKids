
// eslint-disable-next-line react/prop-types
const Checkbox = ({type, label, value, onChange}) => {
    return(
        <div>
            <input
                type={type} 
                id={label}
                name={label}
                checked={false}
                readOnly />
            <label htmlFor={label}>{label}</label>

        </div>
    )    
}

export default Checkbox