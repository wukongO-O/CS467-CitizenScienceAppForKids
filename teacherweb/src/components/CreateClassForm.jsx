import  PropTypes  from "prop-types";
import { useState } from "react";

const CreateClassForm = ({onClassSubmit}) => {
    const [class_name, setClassName] = useState("");
    const [description, setDescription] = useState("");
    const [number_of_students, setTotalOfStudents] = useState(0);

    const handleSubmit = () =>{
        const class_code = class_name.substring(0,3).toUpperCase() + "101";
        onClassSubmit({class_name, description, number_of_students, class_code})
    }

    return(
        <form
            className="full-width-section account-form"
            onSubmit={((e)=>{
                    e.preventDefault()
                    handleSubmit()})}>
            <div className="bigger-input">
                <label htmlFor="class_name" >Class Name</label>
                <input
                required
                    type="text"
                    value={class_name}
                    onChange={e=> setClassName(e.target.value)}/>
            </div>
            <div >
                <label htmlFor="class_name">Total Students</label>
                <input
                required
                    className="smaller-input"
                    type="number"
                    value={number_of_students}
                    onChange={e=> setTotalOfStudents(parseInt(e.target.value, 10) || 0)}/>
            </div>
            <div className="wide-form-wrapper">
                <label htmlFor="class_name">Description</label>
                <textarea
                required
                    value={description}
                    onChange={e=> setDescription(e.target.value)}>
                    </textarea>
            </div>
            <button
                type="submit"
                className="button medium">Submit Class</button>
        </form>
    )
}

CreateClassForm.propTypes = {
    onClassSubmit: PropTypes.func.isRequired
}

export default CreateClassForm;