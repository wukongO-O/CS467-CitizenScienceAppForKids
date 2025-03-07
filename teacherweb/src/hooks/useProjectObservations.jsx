import {useState, useEffect} from 'react';

export const useProjectObservations = (project_id, setStateFunc) => {
    const [observations, setObservations] = useState(null);

    useEffect( ()=> {
        async function fetchObservations () {
            const response = await fetch(`http://127.0.0.1:5000//observations/project/${project_id}`)
            const data = await response.json();
            setObservations(data);
            if (setStateFunc){
                setStateFunc(data);
            }
        }
        fetchObservations();
    },[project_id, setStateFunc])

    return observations
}

