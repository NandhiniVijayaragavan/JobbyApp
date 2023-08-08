const nodemailer = require ("nodemailer");
const { G_USERNAME, G_PASSWROD } = require("../Config/config");

module.exports = {
    sendMailController: async (email,name) => {
        // console.log("inside mail controller");
        let transporter = nodemailer.createTransport({
            
            service :"gmail",
            auth:{
                user: G_USERNAME,
                pass: G_PASSWROD,
            },
            tls:{
                rejectUnauthorized:false
              }
        });

          let html =`<html>
          <body>
          <h2> Hi ${name} </h2>
          <p> You have successfully registered
          with us.</p>
          <p>Login and enjoy searching for jobs and posting jobs.</p><br><br><br>
          <p>Regards, </p>
          <p> Jobby App Services</p>
          </body>
          </html>`;  

    //mail details
    let message = {
        from: "nandy14577@gmail.com", //sender address
        // to: "saralaragavan71@gmail.com" ,//to address
        to: email,
        subject: "Registered Successfully",
        html:html,
    };

    transporter
    .sendMail(message)
    .then((info) => {
        console.log(info);
        return ({message:"Sucessfully send the mail"});
    })
    .catch(err => {
        console.log(err);
        return ({message:"Failed to send mail"});
    });
},
};