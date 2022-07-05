const AuthRoute = require('express').Router()
const User = require('../Models/user')
const joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')
const schema = joi.object({
    name : joi.string().min(6).required(),
    email : joi.string().min(6).required().email(),
    password: joi.string().min(6).required()
})


AuthRoute.post('/register', async(req,res)=>{

        const {error} = schema.validate(req.body)
        if(error) return res.status(400).send(error.details[0].message)

        const emailExist = await User.findOne({email : req.body.email})
        if(emailExist) return res.status(400).send('Email already exists')
        
        const salt = await bcrypt.genSalt(10)
        const HashedPassword = await bcrypt.hash(req.body.password,salt)

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: HashedPassword
        })
        try{
            const savedUser = await user.save()
            res.send(savedUser.id)
        }catch(err){
            res.status(400).send(err)
        }
    })
AuthRoute.post('/Login', async(req,res)=>{
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.send("invalid username or password")
    
    const validation = await bcrypt.compare(req.body.password,user.password)
    if(!validation) return res.send("invalid username or password")
    
    const token = jwt.sign({_id: user.id, name: user.name}, process.env.TOKEN_SECRET)
    res.header('auth-token').send(token)
    
})


module.exports = AuthRoute