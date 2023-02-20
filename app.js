const express =require('express');
const router =require('./src/routes/api');
const app= new express();
const bodyParser =require('body-parser');
const rateLimit =require('express-rate-limit');
const mongoSanitize =require('express-mongo-sanitize');
const xss =require('xss-clean');
const hpp =require('hpp');
const helmet = require('helmet')
const cors = require('cors')
require('dotenv').config()

// Database Lib Import
const mongoose =require('mongoose');
const path = require("path");
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(cors());
app.use(hpp());
app.use(express.json({ limit: "50mb" }));
//app.use(express.urlencoded({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }))
app.use(bodyParser.json());
const limiter= rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter)


// Routing Implement
app.use("/api/v1",router)

// Mongo DB Database Connection
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL, {autoIndex:true} ,(error)=>{
    res.header("Access-Control-Allow-Origin", "https://amirhamza-task-manager.netlify.app");
    console.log("DB Connection Success")
    console.log(error)
})


// Undefined Route Implement
app.get('*', (req,res) =>{
    res.status(400).json({status: "fail", data: "Not Found"})
})


module.exports=app;
