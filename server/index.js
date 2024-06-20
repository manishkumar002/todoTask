const express = require('express');
const app=express()
const env =require('dotenv')
const bodyParser=require('body-parser')
const PORT =process.env.PORT || 8000
const cors=require('cors')

const TodoRauter=require("./Routers/todoRouters")
app.use(bodyParser.json())
app.use(express.json())
app.use(cors())
app.use("/api",TodoRauter)
 env.config()
require('./Config/db')
app.listen(PORT,()=>{
    console.log("Server is a running :"+ PORT)
})