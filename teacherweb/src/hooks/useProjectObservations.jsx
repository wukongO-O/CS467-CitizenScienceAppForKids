import {useState, useEffect} from 'react';

export const useProjectObservations = (project_id, setHeadersStateFunc) => {
    const [observations, setObservations] = useState(null);

    useEffect( ()=> {
        async function fetchObservations () {
            const response = await fetch(import.meta.env.VITE_API_BASE_URL + `/observations/project/${project_id}`)
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

