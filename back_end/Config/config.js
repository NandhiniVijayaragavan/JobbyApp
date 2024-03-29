require("dotenv").config();

module.exports = {
    PORT : process.env.PORT,
    USERNAME :process.env. MYSQL_USERNAME,
    PASSWORD :process.env. MYSQL_PASSWORD,
    HOST:process.env. MYSQL_HOST,
    DATABASE:process.env.MYSQL_DATABASE,
    ACCESS_TOKEN : process.env.ACCESS_TOKEN,
    G_USERNAME : process.env.GMAIL_USERNAME,
    G_PASSWROD : process.env.GMAIL_PASSWORD
}