import {useState, useEffect} from 'react';

export const useProjects = (teacher_id) => {
    const [projects, setProjects] = useState(null);
    const [classes, setClasses] = useState(null)


    useEffect( ()=> {
        
        async function fetchProjects () {
            const response_classes = await fetch(import.meta.env.VITE_API_BASE_URL + `/classes/${teacher_id}`);
            const response_classes_list = await response_classes.json()
            
            if(response_classes_list.error){ //no projects to return
                setProjects([]);
                setClasses([]);
            }else{
                const response = await Promise.all(response_classes_list.map(async (curr_class) => {
                        const one_class_projects =  await fetchClassesProjects(curr_class.class_id)
                        return one_class_projects.map((clss)=>{
                            return {...clss, class_name:curr_class.class_name}}
                        )
                }))
                const projects_data = response;
                setProjects(projects_data.flat());
            }
        }

        async function fetchClassesProjects(class_id){
            const response = await fetch(import.meta.env.VITE_API_BASE_URL + `/projects/class/${class_id}`);
            const data = await response.json();
            return data
        }
        
        fetchProjects();
    },[teacher_id])

    return {projects, classes}
}

