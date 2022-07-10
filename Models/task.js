const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
        max : 2000    
    },
    desc : {
        type : String,
        required : true,
        max : 50000
    },
    dueDate : {
        type : Date,
        required : true
    },
    userid : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('Task',taskSchema)