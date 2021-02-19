const mongoose = require('mongoose')



const EmpSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    date : {
        type : Date,
        required : true
    },
    phone_number : {
        type : String,
        required : true,
        unique : true
    },
    organization : {
        type : String,
        required : true
    },
    rating : {
        type : String,
        required : true
    }
})


module.exports = mongoose.model('Employee', EmpSchema)