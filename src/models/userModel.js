const  mongoose=require('mongoose');
const DataSchema=mongoose.Schema({
    email:{
        type:String,
        unique:true,
        lowercase: true,
        trim: true
    },
    firstName:{
        type:String,
        trim:true,
    },
    lastName:{
        type:String,
        trim:true,
    },
    mobile:{
        type:String,
    },
    password:{
        type:String,
    },
    photo:{
        type:String
    },
    createdDate:{type:Date,default:Date.now()}

},{ timestamps: true, versionKey:false});


const UsersModel=mongoose.model('users',DataSchema);
module.exports=UsersModel

