import React, { useState, useEffect, useRef } from "react";
import axios from 'axios'
import Dropdown from "../Components/CustomSelect/Select";
import LineChart from "../Components/Graph/LineChart";
import Card from "../Components/Card/Card";


const Home = () => {

    const [value, setValue] = useState(0)
    const [titleGraph, setNameGraph] = useState('Grafica')
    const [lastData, setLatsData] = useState({})
    const [last20, setLast20] = useState([])
    const [dataGraph5, setDataGraph5] = useState([])
    const [data, setData] = useState([])
    const [labels, setLabels] = useState([])

    useEffect(() => {
        getLastData()
        const interval = setInterval(() => {
            getLastData()
            //updateDataGraph()
        }, 2000);

        return () => clearInterval(interval);
    }, []);


    useEffect(() => {
      //  grafica5()
        axios.get('http://localhost:5500/data/experiment')
            .then(res => {
                setLast20(res.data)

            })
    }, [])




    const getLastData = async () => {
        await axios.get('http://localhost:5500/data/current').then(res => {
            const object = res.data[0]
            object.Metano = object.Metano.toFixed(2)
            object.Temperatura = object.Temperatura.toFixed(2)
            object.Gas = object.Gas.toFixed(2)
            object.GeneradorChispa = object.GeneradorChispa.toFixed(2)


            setLatsData(object)
        })

        // clearTimeout()
    }

    // const grafica5 = async () => {
    //     await axios.get('http://localhost:5500/data/grafica5').then(res => {
           
    //         console.log(res.data)
    //         setDataGraph5(res.data)
    //         console.log(dataGraph5)
           
    //     })
        
    // }

    const changeGraph = async (show) => {
        let index = show.target.selectedIndex

        setNameGraph(show.target.options[index].text)
        setValue(show.target.value)

        data.splice(0, data.length)
        labels.splice(0, labels.length)
        // if (index === 5) {
        //     grafica5().then(res=> {
        //         console.log(res)
        //         if (dataGraph5.length > 0) {
        //             dataGraph5.map((x,index) => {
        //                 console.log(index)
        //                 data.unshift(x.GeneradorChispa)
        //                 labels.unshift(x._id.fecha)
        //             })
        //         }
        //         console.log("sale")
        //         setData(data)
        //         setLabels(labels)
        //     })
            
        //   //  console.log(dataGraph5)
            
        // } else {


            if (last20.length > 0) {
                last20.map(x => {
                    if (index === 1) {
                        data.unshift(x.Metano)

                    } else if (index === 2) {
                        data.unshift(x.Temperatura)

                    } else if (index === 3) {
                        data.unshift(x.Metano)

                    } else if (index === 4) {
                        data.unshift( x.Gas !==0 && x.GeneradorChispa !== 0 ?  x.Metano : 0)
                    } 
                    if(index !==3)
                        labels.unshift(x.Fecha)
                    else
                        labels.unshift(Number(x.Temperatura).toFixed(2))
                })
            }
            setData(data)
            setLabels(labels)
    
       // }
        return null
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
                            <Card title={'Metano'} icon={'bi bi-emoji-dizzy-fill'} cantidad={lastData.Metano + ' hhmm'} fecha={lastData.Fecha} />
                            <div />
                        </div>
                        <div class="col">
                            <Card title={'Temperatura'} icon={'bi bi-cloud-haze-fill'} cantidad={lastData.Temperatura + ' %'} fecha={lastData.Fecha} />
                            <div />
                        </div>
                        <div class="col">
                            <Card title={'Gas'} icon={'bi bi-circle-fill'} color={Number(lastData.Gas) >  0 ? 'green' : 'red '}
                             cantidad={Number(lastData.Gas) > 0 ? 'Encendido': "Apagado"} fecha={lastData.Fecha} />
                            <div />
                        </div>
                        <div class="col">
                            <Card title={'GeneradorChispa'} icon={'bi bi-circle-fill'} color={Number(lastData.GeneradorChispa)> 0 ? 'green':'red'}
                            cantidad={Number(lastData.GeneradorChispa) >  0 ? 'Encendido' : 'Apagado'} fecha={lastData.Fecha} />
                            <div />
                        </div>

                    </div></div>
            </div>
            <div className="m-0 row justify-content-center mb-5">
                <div className="card" style={{ maxWidth: '1000px', alignSelf: 'center' }}>
                    <div style={{ alignContent: 'center', alignItems: 'center' }} >
                        <div className="my-3" style={{ maxWidth: '300px', marginLeft: 'auto', marginRight: 'auto' }}>
                            <Dropdown items={[
                                { name: "Metano vs Tiempo", value: '1' },
                                { name: "Temperatura VS tiempo", value: '2' },
                                { name: "Metano vs Temperatura", value: '3' },
                                { name: "Tiempo de uso", value: 4 }]}
                                onChange={(e) => changeGraph(e).then()} />
                        </div>

                    </div>
                    <div className="container" >

                        <div style={{ maxHeight: '1500px' }}>
                            {value!==0 && 
                            <LineChart value={value} titulo={titleGraph} datos={data} labels={labels} ultimoDato={lastData} />}
                        </div>

                    </div>
                </div>
            </div>



        </>
    )
}
export default Home;