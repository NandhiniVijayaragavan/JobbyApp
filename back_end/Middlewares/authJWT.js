const jwt =require ("jsonwebtoken");
const {ACCESS_TOKEN} = require("../Config/config");

module.exports.signJWTToken = (payload) => {
    return new Promise((resolve, reject) => {
        const options  = {
            expiresIn: "12h",
        };
        jwt.sign(payload, ACCESS_TOKEN, options, function (err, token){
            // console.log(token);
            if(err) reject(err);
            resolve(token);
        });
    });
};

module.exports.verifyJWTToken = async (req, res, next) => {
    const reqHeader = req.header("authorization")
    if(!reqHeader){
        return res.status(401).send({message:"Access Denied! No token found"})
    }
    const bearerToken = reqHeader.split(" ");
    const token = bearerToken[1];
    try {
        const decoded = await jwt.verify(token, ACCESS_TOKEN);
        console.log(decoded);
        res.decoded=decoded;
        return next();        
    } catch (error) {
        return res.status(401).send({message:error?.message, error:error});
    }

};

module.exports.verifyJWTTokenEmp = async (req, res, next) => {
    const reqHeader = req.header("authorization")
    if(!reqHeader){
        return res.status(401).send({message:"Access Denied! No token found"})
    }
    const bearerToken = reqHeader.split(" ");
    const token = bearerToken[1];
    try {
        const decoded = await jwt.verify(token, ACCESS_TOKEN);
        console.log(decoded);
        res.decoded=decoded;
        if (res.decoded.isemployer) {
            return next();        
            } else {
            return res.status(400).json({ message: "Not Authorized" });
            }
    } catch (error) {
        return res.status(401).send({message:error?.message, error:error});
    }

};