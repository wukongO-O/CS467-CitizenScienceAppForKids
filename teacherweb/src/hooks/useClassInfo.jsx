import {useState, useEffect} from 'react';

export const useClassInfo = (id, setStateFunc) => {
    const [currClass, setCurrClass] = useState(null);

    useEffect( ()=> {
        async function fetchClassInfo () {
            const response = await fetch(`http://127.0.0.1:5000/class/${id}`)
            // const response = await fetch(`/src/components/classdata.json`);
            const data = await response.json();
            // const classData = data.classes.filter((oneClass)=> oneClass.class_id == id);
            setCurrClass(data);

            if (setStateFunc){
                setStateFunc(data);
            }
        }
        fetchClassInfo();
    },[id, setStateFunc])

    return currClass;
}

