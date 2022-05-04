// Liberias del Servidor
import express from "express";
// Librerias de mongo
import mongoose from "mongoose";
import Data from './data.js';
// Librerias del Serial Port para conectar arduino
import serialport, { ReadlineParser } from 'serialport';

//----------------------------------------- MONGO

const password = "arqui2"
const dbName = "Plantas"
const user = "admin"
const mongoURL = `mongodb+srv://${user}:${password}@cluster0.qbalj.mongodb.net/${dbName}?retryWrites=true&w=majority`


mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log('Connected Data Base'))
.catch(e => console.log(e))


//----------------------------------------- SERVER

const app = express()
const port = 5500
app.use(express.json({limit: "50mb"})) // Middleware Reconocer JSON expandiendo el limite
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//----------------------------------------- ARDUINO

/*
const SerialPort = serialport.SerialPort;
const portName = "COM3";

const myPort = new SerialPort({
    path: portName,
    baudRate:9600,
});

const parser = myPort.pipe(new ReadlineParser({delimiter: '\r\n'}));

parser.on('open',onOpen);
parser.on('data',onData);

function onOpen(){
    console.log("Open connections!");
}

function onData(line){
    const datastr = "" + line
    
    try{
        const datajson = JSON.parse(datastr)
        console.log(datajson)
        const datanew = new Data(datajson);
        datanew.save(function (err, datapozo) {
            if (err) return console.error(err);
            console.log(" New Data Inserted");
          });
        
        
    }catch(err){
        console.log("Error al leer json")
    }
}
*/



//Endpoint para consultar los 20 datos 
app.get("/data/experiment",(req,res)=>{
    Data.find({},(err,docs)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(docs)
        }
    }).sort({$natural:-1}).limit(30)
})



//endopoit para consultar el ultimo dato ingresado
app.get("/data/current",(req,res)=>{
    Data.find({},(err,docs)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(docs)
        }
    }).sort({$natural:-1}).limit(1)
})




app.get("/", async (req,res) => {
    res.send("Welcom Backend")
})




app.get("/data", async (req,res) => { 
    
    try{
        const arrayDatasDB = await Data.find({}, (err,docs) =>{
            if(err){
                res.status(500).send(err)
            }else{
                res.status(200).send(docs)
            }
        }).sort({$natural:-1}).limit(1)
    }catch(e) {
        console.log(e)
    }
})



// Endpoint para enviar los datos a mongo 
app.post("/data",(req,res) => {
    //iniciar()
    let now = new Date();
    let dia = now.getDay().toString();
    let mes = now.getMonth().toString();
    let year = now.getFullYear().toString();
    let hora = now.getHours().toString();
    let minuto = now.getMinutes().toString();
    let segundo = now.getSeconds().toString();
    let fecha = year+"/"+mes+"/"+dia+"-"+hora+":"+minuto+":"+segundo;
    
    let clientData = req.body
    let mongoRercord = []
    clientData.forEach( client => {
        mongoRercord.push({
            Metano: Math.random() * (100 - 0) + 0,
            Temperatura: Math.random() * (100 - 0) + 0,
            Gas: 0,
            GeneradorChispa: 0,
            Tiempo:Math.random() * (100 - 0) + 0,
            Fecha: fecha
        })
    })

    Data.create(mongoRercord, (err, records) => {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(records)
        }
    })
})
var cronometro
function iniciar(){
   let contador_s=0
   let contador_m=0
    cronometro = setInterval(function(){
        if (contador_s==60){
            contador_s=0
            contador_m++
            if (contador_m==60){
                contador_m=0
            }
        }
        contador_s++
        console.log(contador_m+":"+contador_s)
    },1000)
}

function detener(){
    clearInterval(cronometro)
}


app.delete("/data", (req,res) => {
    Data.deleteMany({}, (err) =>{
        res.status(500).send(err)
    })
})



app.listen(port,() => { 
    console.log(`Server is listening at http://localhost:${port}`)
})
