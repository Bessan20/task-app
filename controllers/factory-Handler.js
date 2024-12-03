const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/api-error.js');
const { Model } = require('mongoose');

const getAll = (Model) => 
    
    asyncHandler(async(req,res,next)=>{
        const documents = await Model.find({});
        res.status(200).json({status : true , nHits : documents.length , data : documents});
    });

const createOne = (Model) =>

    asyncHandler(async(req,res,next)=>{
        const document = await Model.create(req.body);
        res.status(201).json({status : true , data : document});
    });

const getOne = (Model) =>
    asyncHandler(async(req,res,next)=>{
        const document = await Model.findById(req.params.id);
        if(!document)
            return next(new ApiError(`No document for this id`),404);
        res.status(200).json({status : true , data : document});
    });

const deleteOne = (Model) =>
    asyncHandler(async(req,res,next)=>{

        const document = await Model.findByIdAndDelete(req.params.id);
        if(!document)
            return next(new ApiError(`No document for this id`,404));
        res.status(200).json({status : true , message : 'document deleted successfully'});
    }
    );

const updateOne = (Model) =>
    asyncHandler(async(req,res,next)=>{

        const document = await Model.findByIdAndUpdate(req.params.id,req.body,{new : true,runValidators : true});
        if(!document)
            return next(new ApiError(`No document for this id `,404));
        res.status(200).json({status:true , data:document});
    });
module.exports = {

    getAll,
    createOne,
    getOne,
    deleteOne,
    updateOne
}