import {Pie} from "react-chartjs-2";
import {Chart as ChartJS, Tooltip, Legend, ArcElement} from "chart.js";
import { useClassInfo } from "../../hooks/useClassInfo";
import { useProjectObservations } from "../../hooks/useProjectObservations";

ChartJS.register(Tooltip, Legend, ArcElement);


const PieChart = ({id}) => {

    const classInfo = useClassInfo(id);
    const observations = useProjectObservations(id);

    if (!classInfo || !observations) {
        return <div>Loading...</div>
    }

    const totalStudents = classInfo.number_of_students;
    const totalObservations = observations.length;
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


    const options = {
        elements: {
            arc: {
                borderWidth: 0
            }
        },
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font:{
                        size:12
                    },
                    usePointStyle: true
                 }
            }
        }
    }

    return(
        <div className="chart_wrapper">
            <Pie options={options} data={data} />

        </div>
    )
}

export default PieChart;