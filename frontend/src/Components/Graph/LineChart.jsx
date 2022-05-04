import React, { useEffect } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { Line } from "react-chartjs-2";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);



const LineChart = ({titulo, datos, labels, measure}) => {

    useEffect(() => {
        console.log(datos)
    })

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top"
            },
            title: {
                display: true,
                text: titulo
            }
        },
        scales: {
            y: {
                min: 0,
                max: 100,
            }
        },
    };
    const data = {
        labels,
        datasets: [
            {
                label: measure,
                data: datos,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)"
            }
        ]
    };
    return (<div><Line options={options} data={data} /></div>);
}

export default LineChart