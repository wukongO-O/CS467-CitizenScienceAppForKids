import {useState, useEffect} from 'react';
//returns all classes that are associated to a user identified by teacher_id
export const useClassesInfo = (teacher_id, setStateFunc) => {
    const [classes, setClasses] = useState(null);

    useEffect(()=>{
        async function fetchClassesInfo () {
            const response = await fetch(`http://127.0.0.1:5000/classes/${teacher_id}`);
            const data = await response.json();
            setClasses(data);

            if (setStateFunc){
                setStateFunc(data);
            }
        }
        fetchClassesInfo();
    },[teacher_id, setStateFunc]);


    return classes;
}