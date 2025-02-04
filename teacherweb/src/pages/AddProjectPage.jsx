import { useState } from "react"
import AddProjectMainInfo from "../components/AddProjectMainInfo"
import AddProjectObservationDetails from "../components/AddProjectObservationDetails"

const AddProjectPage = () => {
    const [view, setView] = useState("main")

    const changeView = () => {
        setView("observations")
    }

    return(
        <div className="main-container">
            {view == "main" ? 
                <AddProjectMainInfo 
                    changeView={changeView}/> :
                <AddProjectObservationDetails/>
             }
        </div>
    )

}

export default AddProjectPage