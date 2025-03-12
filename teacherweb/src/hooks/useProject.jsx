import {useState, useEffect} from 'react';

export const useProject = (id, setStateFunc) => {
    const [project, setProject] = useState(null);

    useEffect( ()=> {
        async function fetchProject () {
            const response = await fetch(import.meta.env.VITE_API_BASE_URL + `/projects/${id}`)
            const data = await response.json();
            const parsedData = await parseBackendData(data)
            setProject(parsedData);

            if (setStateFunc){
                setStateFunc(parsedData);
            }
        }

        
        fetchProject();
    },[id, setStateFunc])

    return project
}


async function parseBackendData(data) {
    const parsedData = { ...data }; // Create a shallow copy to avoid modifying the original
  
    try {
      if (typeof parsedData.directions === 'string') {
        parsedData.directions = JSON.parse(parsedData.directions);
      }
    } catch (error) {
      console.error("Error parsing directions:", error);
      // Handle the error appropriately (e.g., set to null or an empty array)
      parsedData.directions = null; // or parsedData.directions = [];
    }
  
    try {
      if (typeof parsedData.form_definition === 'string') {
        parsedData.form_definition = JSON.parse(parsedData.form_definition);
      }
    } catch (error) {
      console.error("Error parsing form_definition:", error);
      // Handle the error appropriately
      parsedData.form_definition = null; // or parsedData.form_definition = [];
    }
  
    return parsedData;
  }
