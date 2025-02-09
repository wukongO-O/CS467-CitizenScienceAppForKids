import { useState } from "react";
import StepsList from "./OrderedList";

const AddProjectMainInfo = ({changeView}) => {
    const [projectName, setProjectName] = useState();
    const [projectDescription, setProjectDescription] = useState();
    const [classType, setClassType] = useState("Biology Honors");
    const [startDate, setStartDate] = useState();
    const [dueDate, setDueDate] = useState();
    const [step, setStep] = useState();
    const [steps, setSteps]=useState([]);

    return(
            <form 
                onSubmit={((e)=>{
                    e.preventDefault()
                    changeView()
                })}>
                <div className="left-form-wrapper">
                    <label htmlFor="project-name">Project Name</label>
                        <input 
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
                        <option value="bio_honors">Biology Honors</option>
                        <option value="chem_ii">Chemistry II</option>
                    </select>
                    <label htmlFor="start-date">Start Date</label>
                        <input 
                            type="date" 
                            name="start-date"
                            value={startDate}
                            onChange={(e)=>setStartDate(e.target.value)} />
                    <label htmlFor="due-date">Due Date</label>
                        <input 
                            type="date" 
                            name="due-date"
                            value={dueDate}
                            onChange={(e)=>setDueDate(e.target.value)} />                
                </div>
                <div className="wide-form-wrapper">
                    <label htmlFor="step">Steps</label>
                        <StepsList items={steps} /> 
                        <input 
                            type="text" 
                            name="step"
                            value={step}
                            onChange={(e)=>{
                                setStep(e.target.value)}} />
                        <button
                            className="button"
                            type="submit"
                            onClick={(e)=>{
                                e.preventDefault()
                                if(step){
                                    setSteps([...steps, step])
                                    setStep('')
                                }
                            }} > Add Step </button>
                </div>
                <button type="submit" className="button">Save and Continue</button>
            </form>
    )
}

export default AddProjectMainInfo