const express =require ("express");
const app = express();
require("dotenv").config();
const path = require("path");
const routes = require ("./Routes/index");

console.log("Welcome");
app.use(express.json());

app.use ("/api",routes);

app.listen(process.env.PORT, ()=> {
    console.log("Server is running on port no :" + process.env.PORT);
});