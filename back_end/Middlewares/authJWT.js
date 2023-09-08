const jwt =require ("jsonwebtoken");
const {ACCESS_TOKEN} = require("../Config/config");
const connection = require("../Helpers_DB/db");

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

  
module.exports.verifyJWTTokenOwner = async (req, res, next) => {
    if (!res.decoded) {
      return res.status(401).send({ message: "Access Denied! No token found" });
    }
  
    if (res.decoded.isemployer) {
      const jobId = req.params.jobId;
  
      const sql = "SELECT userId FROM jobs WHERE jobId = ?";
  
      connection.query(sql, [jobId], (err, results) => {
        if (err) {
          return res.status(500).json({ message: "Database error", error: err });
        }
  
        if (results.length === 0) {
          return res.status(404).json({ message: "Job not found" });
        }
  
        const jobUserId = results[0].userId;
        if (jobUserId === res.decoded.userId) {
          return next();
        } else {
          return res.status(400).json({ message: "Not Authorized" });
        }
      });
    } else {
      return res.status(400).json({ message: "Not Authorized" });
    }
  };
  