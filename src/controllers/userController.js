const jwt = require("jsonwebtoken");
const UsersModel = require("../models/userModel");

// Registration 
exports.registration=(req, res)=>{
    let reqBody = req.body;
    UsersModel.create(reqBody,(error,data)=>{
        if(error){
            res.status(200).json({status:"fail" , data:error})
        }
        else{
            res.status(200).json({status:"success", data:data})
            res.set("Cross-Origin-Resource-Policy", "cross-origin")
        }
    })
}

// Login
exports.login=(req, res)=>{
    let reqBody = req.body;
    UsersModel.aggregate([
        {$match:reqBody},
        {$project:{_id:0, email:1, firstName:1, lastName:1, mobile:1}}
    ], (error, data)=>{
        if(error){
            res.status(400).json({status:"fail",data:error})
        }
        else {
            if(data.length>0){
                let Payload={exp: Math.floor(Date.now() / 1000) + (24*60*60), data:data[0]['email']}
                let token = jwt.sign( Payload,  process.env.JWT_SECRET);
                res.status(200).json({status:"success",token:token,data:data[0]})
            }
            else {
                res.status(401).json({status:"unauthorized"})
            }
        }
    })
}

// Update
exports.profileUpdate=(req,res)=>{
    let email= req.headers['email'];
    let reqBody=req.body;
    UsersModel.updateOne({email:email},reqBody,(error,data)=>{
        if(error){
            res.status(400).json({status:"fail",data:error})
        }
        else{
            res.status(200).json({status:"success",data:data})
        }
    })

}

//Delete 
// exports.profileDetails=(req,res)=>{
//     let email= req.headers['email'];
//     UsersModel.aggregate([
//         {$match:{email:email}},
//         {$project:{_id:1,email:1,firstName:1,lastName:1,mobile:1,photo:1,password:1}}
//     ],(err,data)=>{
//         if(err){
//             res.status(400).json({status:"fail",data:err})
//         }
//         else {
//             res.status(200).json({status:"success",data:data})
//         }
//     })
// }