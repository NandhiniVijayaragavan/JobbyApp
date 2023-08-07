const express = require ("express");
const { getAllJobList, addJobPost, updateJobPost, deleteJob, getUserjobList } = require("../Controllers/jobPostController");
const { verifyJWTToken, verifyJWTTokenEmp } = require("../Middlewares/authJWT");
const router = express.Router();

router.get("/getAllJob",verifyJWTToken,getAllJobList);
router.post("/addJobPost",verifyJWTTokenEmp,addJobPost);
router.put("/updateJobPost",verifyJWTTokenEmp,updateJobPost);
router.delete("/deleteJob/:id",verifyJWTTokenEmp,deleteJob);
router.get("/getUserjobList/:userId",verifyJWTTokenEmp, getUserjobList);

module.exports =router;