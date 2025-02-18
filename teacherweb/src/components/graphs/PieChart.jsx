import {Pie} from "react-chartjs-2";
import {Chart as ChartJS, Tooltip, Legend, ArcElement} from "chart.js";

ChartJS.register(Tooltip, Legend, ArcElement);

const data = {
    labels:["Completed", "Not Started", "Pending"],
    datasets:[
        {
            data:[5, 10, 10],
            backgroundColor:[
                'rgb(4, 191, 218)',
                'rgb(155, 136, 237)',
                'rgb(255, 168, 74)'
            ],
            hoverOffset:4,
        },
    ],
}

const PieChart = () => {

    const options = {};

    return(
        <div className="chart_wrapper">
            <Pie options={options} data={data} />

        </div>
    )
}

export default PieChart;