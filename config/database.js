const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config(({path:'config.env'}));

const dbConnection = ()=>{

    mongoose.connect(process.env.MONGO_URL)
    .then((conn)=>{
        console.log(`connected successfully to ${conn.connection.host}`);
    })
    //.catch((err)=>{
        //console.error(`this an error ${err}`);
    //})
};

module.exports = dbConnection;