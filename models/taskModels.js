const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

    name : {
        type : String,
        lowercase : true,
        trim : true,
        required : [true , "this field is required"],
        maxlength : [40,"max length is 40 characters"],
        minlength : [3 , "min length is 3 characters"],
    },
    inProgress : {

        type : Boolean,
        default : false,
    },
    completed :{

        type : Boolean,
        default : false,
    }
},{timestamps : true});

const task = mongoose.model('Task',taskSchema);
module.exports = task;