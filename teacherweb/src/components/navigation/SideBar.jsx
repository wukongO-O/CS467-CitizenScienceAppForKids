import { useEffect, useState, useRef } from "react";
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import MyCalendar from "../MyCalendar";
import PieChart from "../graphs/PieChart";

const SideBar = ({children}) => {
    const location = useLocation();
    const [content, setContent] = useState(null);
    
    const elRef = useRef(null);
    if (!elRef.current) {
        elRef.current = document.createElement('div');
    }

    useEffect( () =>{
         switch (location.pathname):
            case '/homepage':
                setContent(<div>Calendar <div>Project Info go here</div></div>);
            case '/add':
            case '/edit':
                setContent(<div>Calendar</div>);
            case '/projects':
                setContent(<div>Calendar</div>);
            case '/project/:id':
            case 'project/:id/submissions':
                setContent(<div>Calendar <PieChart/></div>)
                

    })
}