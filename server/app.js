/* eslint-disable no-undef */
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const mongoDB = 'mongodb+srv://stive:Stivearnaud3@cluster0.yi2sd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
main().catch((err) => console.log(err))
async function main() {
    await mongoose.connect(mongoDB)
}











const port = 3000;
const localhost = '127.0.0.1'
app.listen(port, localhost, function(){
    console.log(`The server is connected to the database MongoDB.`)
})