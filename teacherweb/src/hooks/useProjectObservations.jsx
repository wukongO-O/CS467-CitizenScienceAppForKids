import {useState, useEffect} from 'react';

export const useProjectObservations = (id, setStateFunc) => {
    const [observations, setObservations] = useState(null);

    useEffect( ()=> {
        async function fetchObservations () {
            const response = await fetch(`http://127.0.0.1:5000//observations/project/${id}`)
            const data = await response.json();
            setObservations(data);
            if (setStateFunc){
                setStateFunc(data);
            }
        }
        fetchObservations();
    },[id, setStateFunc])

    return observations
}

