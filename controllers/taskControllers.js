const Task = require('../models/taskModels.js');
const factory = require('./factory-Handler.js');

const asyncHandler = require('express-async-handler');

const getAllTasks = factory.getAll(Task);

const createTask = factory.createOne(Task); 

const getTasksInProgress = asyncHandler(async(req,res)=>{

        const tasks = await Task.find({inProgress : false});
        res.status(200).json({status : 'success' , data : {size : tasks.length , tasks}});
    
});

const getTasksAreDone  = asyncHandler(async(req,res)=>{

        const tasks = await Task.find({completed : true});
        res.status(200).json({status :"success" , data : {size : tasks.length , tasks }});
   
});

const getTasksAreNotDone = asyncHandler(async(req,res)=>{

        const tasks = await Task.find({completed : false});
        res.status(200).json({status : 'success' , data : {size : tasks.length , tasks}});

});

const getTaskById = factory.getOne(Task);
const deleteTask = factory.deleteOne(Task);
const updateTask = factory.updateOne(Task);

module.exports = {

    getAllTasks,
    createTask,
    getTasksInProgress,
    getTasksAreDone,
    getTasksAreNotDone,
    getTaskById,
    deleteTask,
    updateTask

};