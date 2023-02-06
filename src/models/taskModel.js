const  mongoose=require('mongoose');
const DataSchema=mongoose.Schema({
    title:{
        type:String,
        trim:true,
    },
    description:{
        type:String,
        trim:true,
    },
    status:{
        type:String,
        trim: true
    },
    email:{
        type:String,
        lowercase: true, 
        trim: true
    }
    
},{timestamps: true, versionKey:false});


const TasksModel=mongoose.model('tasks',DataSchema);
module.exports=TasksModel


