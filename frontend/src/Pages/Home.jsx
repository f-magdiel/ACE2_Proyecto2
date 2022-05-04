
import React, { useState, useEffect } from "react";
import axios from 'axios'
import Dropdown from "../Components/CustomSelect/Select";
import LineChart from "../Components/Graph/LineChart";
import Card from "../Components/Card/Card";
const Home = () => {

    const [showGrafica, setShowGrafica] = useState(false)
    const [titleGraph, setNameGraph] = useState('Grafica')
    const [lastData, setLatsData] = useState({})
    const [last20, setLast20] = useState([])
    const [data, setData] = useState([])
    const [labels, setLabels] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5500/data/experiment')
            .then(res => {
                setLast20(res.data)
            })
    }, [])

    useEffect(() => {
        getLastData()
    }, [])

    const getLastData = () => {
        axios.get('http://localhost:5500/data').then(res => {
            console.log(res.data)
            const object = res.data[0]
            object.Metano =object.Metano.toFixed(2)
            object.Temperatura =object.Temperatura.toFixed(2)
            object.GeneradorChispa =object.GeneradorChispa.toFixed(2)
            object.Gas =object.Gas.toFixed(2)
            setLatsData(object)
        })
    }


    const changeGraph = (show) => {
        let index = show.target.selectedIndex
        console.log(last20)
        setNameGraph(show.target.options[index].text)

        data.splice(0, data.length)
        labels.splice(0, labels.length)

        if (last20.length > 0) {
            last20.map(x => {
                if (index === 1) {
                    data.unshift(x.Metano)

                } else if (index === 2) {
                    data.unshift(x.Temperatura)

                } else if (index === 3) {
                    data.unshift(x.Gas)

                } else if (index === 4) {
                    data.unshift(x.GeneradorChispa)

                }
                labels.unshift(x.Fecha)
            })
        }
        setData(data)
        setLabels(labels)
    }

    return (
        <>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 className="mt-2 display-1">Dashboard</h1>
            </div>
            <div className="mb-5">
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <Card title={'Cantidad Metano'} icon={'bi bi-emoji-dizzy-fill'} cantidad={lastData.Metano + ' fotodiodos'} fecha={lastData.Fecha} />
                            <div />
                        </div>
                        <div class="col">
                            <Card title={'Temperatura'} icon={'bi bi-cloud-haze-fill'} cantidad={lastData.Temperatura + ' %'} fecha={lastData.Fecha} />
                            <div />
                        </div>
                        <div class="col">
                            <Card title={'Gas'} icon={'bi bi-droplet-half'} cantidad={lastData.Gas + ' cm/s'} fecha={lastData.Fecha} />
                            <div />
                        </div>
                        <div class="col">
                            <Card title={'Generador de Chispa'} icon={'bi bi-funnel-fill'} cantidad={lastData.GeneradorChispa + ' fotodiodos'} fecha={lastData.Fecha} />
                            <div />
                        </div>

                    </div></div>
            </div>
            <div className="m-0 row justify-content-center mb-5">
                <div className="card" style={{ maxWidth: '1000px', alignSelf: 'center' }}>
                    <div style={{ alignContent: 'center', alignItems: 'center' }} >
                        <div className="my-3" style={{ maxWidth: '300px', marginLeft: 'auto', marginRight: 'auto' }}>
                            <Dropdown items={[{ name: "Suciedad VS tiempo (vivienda)", value: '1' },
                            { name: "Suelo VS tiempo", value: '2' },
                            { name: "Gas VS tiempo", value: '3' },
                            { name: "Suciedad VS tiempo (filtrado)", value: 4 },
                            { name: "Cantidad de Gas", value: 5 }]}
                                onChange={(e) => changeGraph(e)} />
                        </div>

                    </div>
                    <div className="container" >

                            <div style={{ maxHeight: '1500px' }}>
                                <LineChart titulo={titleGraph} datos={data} labels={labels} measure='Medida' />
                            </div>

                    </div>
                </div>
            </div>



        </>
    )
}
export default Home;