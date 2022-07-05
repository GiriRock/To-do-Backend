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

//Route Middlewares
app.use('/user',AuthRoute)


app.get('/', (req,res) => {
res.send('Hello')
})

app.listen(process.env.PORT||8090)