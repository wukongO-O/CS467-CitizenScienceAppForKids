import {Pie} from "react-chartjs-2";
import {Chart as ChartJS, Tooltip, Legend, ArcElement} from "chart.js";
import { useClassInfo } from "../../hooks/useClassInfo";

ChartJS.register(Tooltip, Legend, ArcElement);


const PieChart = ({id, projectData}) => {

    const classInfo = useClassInfo(id);

    if (!classInfo) {
        return <div>Loading...</div>
    }

    const totalStudents = classInfo.number_of_students;
    const totalObservations = projectData.length;
    const notStarted = totalStudents - totalObservations;

    const data = {
        labels:["Not Started", "In Progress/Completed"],
        datasets:[
            {
                data:[notStarted, totalObservations],
                backgroundColor:[
                    'rgb(4, 191, 218)',
                    // 'rgb(155, 136, 237)',
                    'rgb(255, 168, 74)'
                ],
                hoverOffset:4,
            },
        ],
    }


    const options = {};

    return(
        <div className="chart_wrapper">
            <Pie options={options} data={data} />

        </div>
    )
}

export default PieChart;