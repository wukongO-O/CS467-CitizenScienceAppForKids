
import { CiSquareRemove } from "react-icons/ci";

const OrderedList = ({items, edit, handleDelete}) => {

    return(
             <ol>
                    {items.map((step, i)=>{
                            return (
                                <li key={`step${i}`}>
                                    {step} 
                                    <CiSquareRemove 
                                        className= {edit ? "icon-sm" : "hide-icon"}
                                        onClick={() => handleDelete(i)}/> 
                                    </li> 
                            )
                        })
                    }

                </ol>
    )
}

export default OrderedList