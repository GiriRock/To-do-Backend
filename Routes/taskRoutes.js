const taskRoute = require('express').Router()
const Task = require('../Models/task')
const verifyToken = require('../verifyToken')


taskRoute.get('/getTasks',verifyToken, async(req,res)=>{
    Task.find({userid : req.user._id},(err,arr)=>{
        if(err){
            res.status(200).send(err)
        }else{
            res.status(200).send(arr)
        }
    })
})

taskRoute.post('/addTask',verifyToken,async(req,res)=>{
    const task = new Task({
        title : req.body.title,
        desc : req.body.desc,
        dueDate : req.body.dueDate,
        userid : req.user._id
    })
    try{
        const savedTask = await task.save()
        res.send({"message": "added successfully"})
    }catch(err){
        res.status(400).send(err)
    }
})

module.exports = taskRoute