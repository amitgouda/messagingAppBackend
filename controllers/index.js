const express = require('express');
const app = express();
const sendResponse = require('../utils/sendResponse')
 const userControllers  = require('./userControllers')

app.use('/user', userControllers); 

app.use('/status',(req,res)=>{
    // health check
    return sendResponse(res, 200, {}, "Server is running properly...");
})

module.exports = app;
