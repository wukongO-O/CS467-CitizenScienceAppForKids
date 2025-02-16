import {useState, useEffect} from 'react';

export const useTeacherProjects = () => {
    const [projects, setProjects] = useState(null);

    useEffect(()=>{
        async function fetchTeacherProjects () {
            const response = await fetch("/src/components/studentdata.json");
            const data = await response.json();
            setProjects(data);
        }
        fetchTeacherProjects();
    },[]);

    return projects;
}