import mongoose from "mongoose";
const Schema = mongoose.Schema;

const dataSchema = new Schema({
        SuciedadAgua: Number,
        Humedad: Number,
        Filtrado: Number,
        Agua: Number,
        Fecha:String
})

const Data = mongoose.model('Data',dataSchema)

export default Data;