const express = require ("express");
const { getAllJobList, addJobPost, updateJobPost, deleteJob, getUserjobList } = require("../Controllers/jobPostController");
const { verifyJWTToken, verifyJWTTokenEmp,verifyJWTTokenOwner } = require("../Middlewares/authJWT");
const router = express.Router();

router.get("/getAllJob",verifyJWTToken,getAllJobList);
router.post("/addJobPost",verifyJWTTokenEmp,addJobPost);
router.put("/updateJobPost/:jobId",verifyJWTTokenEmp,verifyJWTTokenOwner,updateJobPost);
router.delete("/deleteJob/:jobId",verifyJWTTokenEmp,verifyJWTTokenOwner,deleteJob);
router.get("/getUserjobList/:userId",verifyJWTTokenEmp, getUserjobList);

module.exports =router;