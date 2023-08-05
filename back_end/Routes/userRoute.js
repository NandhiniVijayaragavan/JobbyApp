const express = require ("express");
const {registeruser} = require("../Controllers/userController");
const router = express.Router();

router.post ("/registeruser",registeruser);

module.exports =router;