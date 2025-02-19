import { useEffect, useRef } from "react";
import { createPortal } from 'react-dom';

const Portal = ({children}) => {
     const elRef = useRef(null);

     if(!elRef.current){
        elRef.current = document.createElement("div");
     }

    useEffect(()=>{
        const portalRoot = document.getElementById("additional-page-content");
        portalRoot.appendChild(elRef.current);

        return() => {//return a function for clean up
            portalRoot.removeChild(elRef.current);
        }
    },[]);

    return createPortal(<div>{children}</div>, elRef.current);

}

export default Portal;