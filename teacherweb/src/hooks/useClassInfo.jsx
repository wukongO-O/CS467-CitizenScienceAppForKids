import {useState, useEffect} from 'react';

export const useClassInfo = (id, setStateFunc) => {
    const [currClass, setCurrClass] = useState(null);

    useEffect( ()=> {
        async function fetchProject () {
            // const response = await fetch(`/class/${id}`)
            const response = await fetch(`/src/components/classdata.json`);
            const data = await response.json();
            const classData = data.classes.filter((oneClass)=> oneClass.class_id == id);
            setCurrClass(classData[0]);

            if (setStateFunc){
                setStateFunc(currClass[0]);
            }
        }
        fetchProject();
    },[id, currClass, setStateFunc])

    return currClass;
}

