const dotenv = require('dotenv');
dotenv.config(({path:'config.env'}));

const express = require('express');
const app= express();

const morgan = require('morgan');

//routes
const route = require('./routes/taskroutes.js');

//middlewares
const notFound = require('./middlewares/not-found.js');
const globalError = require('./middlewares/error-middleware.js');

//utils
const ApiError = require('./utils/api-error.js');



//DataBase connection
const dbConnection = require('./config/database.js');
dbConnection();

//middlewares
app.use(express.json({extended:true}));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));



//routes
//app.use('',route);
app.use('/api/v1/tasks',route);

app.use('*',(req,res,nxt)=>{

    //create error and send it to error handling middleware
    //const err = new Error (`cannot find this route : ${req.originalUrl}`);
    //nxt(err.message);
    //nxt(new ApiError("message",statusCode));
    nxt(new ApiError(`cannot find this route : ${req.originalUrl}`,400));
});
//global error handle middleware must work with express-async-handler
app.use(globalError);
//app.use(notFound);


const PORT = process.env.PORT || 3000;
const server = app.listen((PORT),()=>{
    console.log(`listening to port ....${PORT}`);
});

//events ==> list ==>callback(err)
//any error outside express
process.on("unhandledRejection",(err)=>{
    console.error(`unhandledrejection Errors : ${err.name} | ${err.message}`);
    server.close(()=>{
        console.log(`Shutting down`);
        process.exit(1);
    })
    
});