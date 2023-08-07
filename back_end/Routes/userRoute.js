const express = require ("express");
const {registeruser, loginuser} = require("../Controllers/userController");
const router = express.Router();

router.post ("/registeruser",registeruser);
router.post ("/loginuser",loginuser);

module.exports =router;