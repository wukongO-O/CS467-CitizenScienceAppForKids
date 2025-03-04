import { useState } from "react";
import { useClassInfo } from "../../hooks/useClassInfo";
import OrderedList from "../OrderedList";

const EditProjectMainInfo = ({info,changeView, handleUpdate, teacher_classes}) => {
    // const project_class = useClassInfo(info.class_id);
    const [projectName, setProjectName] = useState(info.title);
    const [projectDescription, setProjectDescription] = useState(info.description);
    // const [classType, setClassType] = useState(info.project_class);
    const [startDate, setStartDate] = useState('pending');
    const [dueDate, setDueDate] = useState('pending');
    const [step, setStep] = useState(); 
    const [steps, setSteps]=useState(info.directions);

    if (!project_class) {
        return( <div className="loading">Loading...</div>)
    }

    const deleteStep = (i) => {
        const newSteps = [...steps.slice(0,i), ... steps.slice(i+1)];
        setSteps(newSteps)
    }

    const onEdit = () => {
        const data= {projectName, projectDescription, classType, startDate, dueDate, steps}
        handleUpdate(data)
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
                        name="class-name" 
                        value={classType}
                        onChange={(e)=>setClassType(e.target.value)} >
                        {teacher_classes.map((teacher_class)=> {
                                
                                return <option value={teacher_class.class_id} key={teacher_class.class_code}>{teacher_class.class_name}</option>
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
                <div className="wide-form-wrapper">
                    <button type="submit" className="button">Update</button>
                    <button 
                        type="submit" 
                        className="button"
                        onClick={(e)=>{
                            e.preventDefault();
                            handleChangeView();
                            }}>Edit Observations</button>

                </div>
            </form>
    )
}

export default EditProjectMainInfo