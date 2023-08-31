const connection =require("../Helpers_DB/db");
const bcrypt = require("bcrypt");
const saltRounds =10;
const authJWT = require("../Middlewares/authJWT");
const { sendMailController } = require("./mailController");


module.exports = {
    registeruser: (req, res)=> {
        // console.log("Inside register user req",req.body);
        const data=req.body;

        connection.query(`SELECT * FROM user WHERE email = '${data.email}'`,
        (err, result) => {
            if (err) {
            return res.status(400).send({ message: "Some Internal server error" });
            } else if (result.length > 0) {
            return res
                .send({ message: "User with this email already exists..." });
            }
        });

        bcrypt.hash(data.password, saltRounds, function(err,hash){
            if(err){
                return res.status(400).send({message:"Error while hashing password", error:err});
            }
            console.log(hash,data.password);
            
            connection.query(
            `insert into user(name,email,phoneno,image,password,isemployer,dob,about)
            values('${data.name}','${data.email}',${data.phoneno},'${data.image}','${hash}','${data.isemployer}',
            '${data.dob}','${data.about}')`,
            (err, results) =>{
            if(err){
                console.log(err);
                return res
                .status(400)
                .send({message:"Error while adding user",error:err});
            }
            sendMailController(data.email,data.name);
            return res.send({message:"Successfully added user"})
        });
        });    
     },
    loginuser:(req, res) => {
        try {
            const data =req.body;
            connection.query(`select * from user where email='${data.email}'`, (qryerr , qryresult) => {
                if(qryerr){
                    return res .status(400).send({message:"Error while singin", error:qryerr})
                }
                console.log(qryresult);
                if(qryresult .length === 0) {
                    return res.status(400).send({message:"Email does not exists!!!"})
                }
                bcrypt.compare(data.password, qryresult[0].password, async function(err, result){
                    if(err){
                        return res.status(400).send({message:"password does not match",error:err})
                    }
                    if(result){
                        const payload ={
                            userId: qryresult[0].id,
                            isemployer: qryresult[0].isemployer,
                        };
                        console.log(payload);
                        const token =await authJWT.signJWTToken(payload);
                        const userFullName = qryresult[0].name;
                        const userProfilePic = qryresult[0].image;
                        const role = qryresult[0].isemployer;
                        const userId =qryresult[0].id;

                        console.log(token);
                        console.log(userFullName);
                        console.log(userId);
                        return res.send({message:"Login Sucessful..",token:token, userFullName: userFullName, userProfilePic: userProfilePic, role: role, userId: userId,});
                    }
                        return res.status(400).send({message:"password does not match"});
                    })
                });
        }catch(error) {
            console.log(error);
            return res.status(400).send({message:"Error while login", error: error});
        }
        
    }
    }