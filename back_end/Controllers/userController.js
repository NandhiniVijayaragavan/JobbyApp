const connection =require("../Helpers_DB/db");
const bcrypt = require("bcrypt");
const saltRounds =10;

module.exports = {
    registeruser: (req, res)=> {
        console.log("Inside register user req",req.body);
        const data=req.body;

        bcrypt.hash(data.password, saltRounds, function(err,hash){
            if(err){
                return res.status(400).send({message:"Error while hashing password", error:err});
            }
            console.log(hash,data.password);
            
            connection.query(
            `insert into user(name,email,phoneno,image,password,isemployer,dob,about)
            values('${data.name}','${data.email}',${data.phoneno},'${data.image}','${hash}','${data.isemployer}','${data.dob}','${data.about}')`,
            (err, results) =>{
            if(err){
                console.log(err);
                return res
                .status(400)
                .send({message:"Error while adding user",error:err});
            }
            return res.send({message:"Successfully added user"})
        });
        });    
     },
     
    }