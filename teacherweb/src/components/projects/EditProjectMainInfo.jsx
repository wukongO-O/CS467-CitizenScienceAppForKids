import { useState } from "react";
import PropTypes from 'prop-types';
import OrderedList from "../OrderedList";
import { useClassesInfo } from "../../hooks/useClassesInfo";

const EditProjectMainInfo = ({info,changeView, handleUpdate}) => {
    const [projectName, setProjectName] = useState(info.title);
    const [projectDescription, setProjectDescription] = useState(info.description);
    const [classType, setClassType] = useState();
    const [startDate, setStartDate] = useState(new Date(info.start_date).toISOString().split('T')[0]);
    const [dueDate, setDueDate] = useState(new Date(info.due_at).toISOString().split('T')[0]);
    const [step, setStep] = useState(); 
    const [steps, setSteps]=useState(info.directions);
    const teacher_classes = useClassesInfo(localStorage.user_id);

    if(!teacher_classes){
        return <div className="loading">Loading...</div>
    }

    const deleteStep = (i) => {
        const newSteps = [...steps.slice(0,i), ... steps.slice(i+1)];
        setSteps(newSteps)
    }

    const onEdit = () => {
        const data= {title:projectName, description:projectDescription, class_name:classType, start_date:startDate, due_at:dueDate, directions:steps}
        handleUpdate(false, data)
    }

    //changing the view, but saving the updated data first
    const handleChangeView = () => {
        const data = {
            title: projectName,
            description:projectDescription,
            project_class: classType,
            start_date:startDate,
            due_at: dueDate,
            directions:steps
        }
        changeView(data)
    }


    return(
            <form 
                onSubmit={((e)=>{
                    e.preventDefault()
                    onEdit()
                })}>
                <div className="left-form-wrapper">
                    <label htmlFor="project-name">Project Name</label>
                        <input 
                            required
                            type="text" 
                            name="project-name" 
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)} />
                    <label htmlFor="project-desciption">Project Description</label>
                        <textarea 
                            name="project-description" 
                            value={projectDescription}
                            onChange= {(e) => setProjectDescription(e.target.value)} >
                    </textarea>
                </div>
                <div className="right-form-wrapper">
                    <label htmlFor="class-name">Class Name</label>
                    <select 
                        required
                        name="class-name" 
                        value={classType}
                        onChange={(e)=>setClassType(e.target.value)} >
                        {teacher_classes.map((teacher_class, i)=> {
                                
                                return <option value={teacher_class.class_id} key={`${teacher_class.class_code}${i}`}>{teacher_class.class_name}</option>
                            })}
                    </select>
                    <label htmlFor="start-date">Start Date</label>
                        <input 
                            required
                            type="date" 
                            name="start-date"
                            value={startDate}
                            onChange={(e)=>setStartDate(e.target.value)} />
                    <label htmlFor="due-date">Due Date</label>
                        <input 
                            required
                            type="date" 
                            name="due-date"
                            value={dueDate}
                            onChange={(e)=>setDueDate(e.target.value)} />                
                </div>
                <div className="wide-form-wrapper">
                    <label htmlFor="step">Steps</label>
                        <OrderedList 
                            edit={true}
                            handleDelete={deleteStep}
                            items={steps} /> 
                        <input 
                            type="text" 
                            name="step"
                            value={step}
                            placeholder="Enter additional steps"
                            onChange={(e)=>{
                                setStep(e.target.value)}} />
                        <button
                            className="no-background"
                            type="submit"
                            onClick={(e)=>{
                                e.preventDefault()
                                if(step){
                                    setSteps([...steps, step])
                                    setStep('')
                                }
                            }} > Add Step </button>
                </div>
                <div className="wide-form-wrapper project-nav">
                    <button 
                        type="submit" 
                        className="button medium">Update Project</button>
                    <button 
                        type="submit" 
                        className="button medium"
                        onClick={(e)=>{
                            e.preventDefault();
                            handleChangeView();
                            }}>Edit Observations</button>

                </div>
            </form>
    )
};

EditProjectMainInfo.propTypes = {
    info: PropTypes.object.isRequired,
    changeView: PropTypes.func.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    // teacher_classes: PropTypes.array.isRequired 
};


export default EditProjectMainInfo