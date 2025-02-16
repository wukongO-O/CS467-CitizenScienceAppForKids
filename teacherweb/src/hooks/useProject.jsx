import {useState, useEffect} from 'react';

export const useProject = (id, setStateFunc) => {
    const [project, setProject] = useState(null);

    useEffect( ()=> {
        async function fetchProject () {
            // const response = await fetch(`/projects/${id}`)
            const response = await fetch(`/src/components/studentdata.json`);
            const data = await response.json();
            const projectData = data.projects.filter((proj)=> proj.project_id == id);
            setProject(projectData[0]);

            if (setStateFunc){
                setStateFunc(projectData[0]);
            }
        }
        fetchProject();
    },[id, setStateFunc])

    return project
}

