const express = require('express');
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()
//Connect to DB
mongoose.connect(process.env.DB_CONN,()=>{
    console.log('connected to DB')
})
//Middlewares
app.use(express.json())

//Import Routes
const AuthRoute = require('./Routes/auth')
const TaskRoute = require('./Routes/taskRoutes')

//Route Middlewares
app.use('/user',AuthRoute)
app.use('/task',TaskRoute)


app.get('/', (req,res) => {
res.send({"message":"alive"})
})

app.listen(process.env.PORT,()=>{console.log("server up and running in "+ process.env.PORT)})