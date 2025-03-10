import {useState, useEffect} from 'react';

export const useProjectObservations = (project_id, setHeadersStateFunc) => {
    const [observations, setObservations] = useState(null);

    useEffect( ()=> {
        async function fetchObservations () {
            const response = await fetch(`http://127.0.0.1:5000//observations/project/${project_id}`)
            const data = await response.json();
            
            setObservations(data);
            if (setHeadersStateFunc){
                
                const headers = Object.keys(data[0].data);
                
                setHeadersStateFunc(headers);
            }
        }
        fetchObservations();
    },[project_id, setHeadersStateFunc])

    return observations
}

