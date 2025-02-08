
const StepsList = (steps) => {
  
    return(
                <ol>
                    {steps.steps.map((step, i)=>{
                            return (
                                <li key={i}>{step}</li> 
                            )
                        })
                    }

                </ol>
    )
}

export default StepsList