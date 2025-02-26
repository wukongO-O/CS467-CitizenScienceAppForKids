import {useState, useEffect} from 'react';

export const useProject = (id, setStateFunc) => {
    const [project, setProject] = useState(null);

    useEffect( ()=> {
        async function fetchProject () {
            const response = await fetch(`http://127.0.0.1:5000/projects/${id}`)
            // const response = await fetch(`/src/components/studentdata.json`);
            const data = await response.json();
            setProject(data);
            if (setStateFunc){
                setStateFunc(data);
            }
        }
        fetchProject();
    },[id, setStateFunc])

    return project
}

