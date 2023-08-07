const express = require ("express");
const router = express.Router();
const userRoutes =require("./userRoute");
const jobRoutes =require("./jobRotue");

router.use("/user",userRoutes);
router.use("/jobs",jobRoutes);

module.exports = router;
