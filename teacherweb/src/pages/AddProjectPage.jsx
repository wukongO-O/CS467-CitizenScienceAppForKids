import { useState } from "react"
import AddProjectMainInfo from "../components/projects/AddProjectMainInfo"
import AddProjectObservationDetails from "../components/projects/AddProjectObservationDetails"

const AddProjectPage = () => {
    const [view, setView] = useState("main");
    const [loading, setLoading] = useState(false);
    const [errorPosting, setErrorPosting] = useState(false);
    const [code, setCode] = useState(null);
    const [showCode, setShowCode] = useState(false);
    const [data, setData] = useState({});

    const changeView = () => {
        setView("observations")
    }

    const mainInfoUpdate = (data) => {
        setData(data)
    }

    const handleSubmit = async ({form_definition}) => {
        const fullData = {...data, form_definition};
        setData(fullData);
        // await addProject(data);
        // setShowCode(true);
    }

    //adds a project and gets back a code for the project
    async function addProject(data){
        //while user waits for data to post and return code a 'loading' message will be shown
        setLoading(true);
        try{
        const res = await fetch("", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                data
            }),
        });
            if (!res.ok){
                setError(true);
                throw new Error ()
            }

            const responseCode = await res.json();
            setCode(responseCode);
            setLoading(false);

        } catch(err){
            console.log("There was an error adding the project")
        }
    }


    return(
        <div className="main-container">
            {view == "main" ? 
                <AddProjectMainInfo 
                    changeView={changeView}
                    handleMainInfoUpdate={mainInfoUpdate}/> :
                <AddProjectObservationDetails
                    handleSubmit={handleSubmit}/>
             }
        </div>
    )

}

export default AddProjectPage