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




const LineChart = ({ titulo, value, datos, labels, ultimoDato }) => {

    useEffect(() => {
        if (ultimoDato !== {} ) {
            changeGraph()
        }
    })

    const changeGraph = () => {

        datos.splice(0, 1)
        labels.splice(0, 1)
        console.log(ultimoDato)
        if (value === '1') {
            datos.push(ultimoDato.Metano)

        } else if (value === '2') {
            datos.push(ultimoDato.Temperatura)

        } else if (value === '3') {
            datos.push(ultimoDato.Metano)

        } else if (value === '4') {
            datos.push( ultimoDato.Gas !==0 && ultimoDato.GeneradorChispa !== 0 ?  ultimoDato.Metano : 0)
        } 
        if (value !== '3')
            labels.push(ultimoDato.Fecha)
        else
            labels.push(ultimoDato.Temperatura)
        

    }

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
                max: 500,
            }
        },
    };
    const data = {
        labels,
        datasets: [
            {
                label: 'medida',
                data: datos,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)"
            }
        ]
    };
    return (<div><Line options={options} data={data} /></div>);
}

export default LineChart