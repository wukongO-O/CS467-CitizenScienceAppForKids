import { useState } from "react";
import StepsList from "../components/StepsList";

const AddProjectPage = () => {
    const [projectName, setProjectName] = useState();
    const [projectDescription, setProjectDescription] = useState();
    const [classType, setClassType] = useState("Biology Honors");
    const [startDate, setStartDate] = useState();
    const [dueDate, setDueDate] = useState();
    const [step, setStep] = useState();
    const [steps, setSteps]=useState([]);

    return(
        <div>
            <form>
                <div id="left-add-project-form">
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
                <div id="right-add-project-form">
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
                <div id="add-project-steps">
                    <label htmlFor="step">Steps</label>
                        <StepsList steps={steps} />
                        <input 
                            type="text" 
                            name="step"
                            value={step}
                            onChange={(e)=>{
                                setStep(e.target.value)}} />
                        <button 
                            type="submit"
                            onClick={(e)=>{
                                e.preventDefault()
                                setSteps([...steps, step])
                                setStep('')
                            }} > Add Step </button>
                </div>
                <button type="submit">Save and Continue</button>
            </form>
        </div>
    )

}

export default AddProjectPage