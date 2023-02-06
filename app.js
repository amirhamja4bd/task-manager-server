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
app.use(express.urlencoded({ limit: "50mb" }));
const limiter= rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter)


// Mongo DB Database Connection
let URI="mongodb://127.0.0.1:27017/task-manager";
let OPTION={autoIndex:true}
mongoose.connect(URI,OPTION,(error)=>{
    console.log("DB Connection Success")
    console.log(error)
})

app.use(express.static('client/build'));

// Routing Implement
app.use("/api/v1",router)

// Undefined Route Implement
app.get('*', (req,res) =>{
    res.status(400).json({status: "fail", data: "Not Found"})
})

// app.get('*',function (req,res) {
//     res.sendFile(path.resolve(__dirname,'client','build','index.html'))
// })

module.exports=app;
