const mysql = require ("mysql2")
require("dotenv").config();
const { HOST,DATABASE,PASSWORD,USERNAME}=require("../Config/config")

const connection = mysql.createConnection({
    host : HOST,
    user : USERNAME,
    password : PASSWORD,
    database : DATABASE
});
module.exports = connection;