import mongoose from "mongoose";
const Schema = mongoose.Schema;

const dataSchema = new Schema({
        Metano: Number,
        Temperatura: Number,
        Gas: Number,
        GeneradorChispa: Number,
        Tiempo:Number,
        Fecha:String
})

const Data = mongoose.model('Data',dataSchema)

export default Data;