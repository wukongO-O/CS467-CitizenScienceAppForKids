
const OrderedList = (items) => {
  
    return(
             <ol>
                    {items.items.map((step, i)=>{
                            return (
                                <li key={i}>{step}</li> 
                            )
                        })
                    }

                </ol>
    )
}

export default OrderedList