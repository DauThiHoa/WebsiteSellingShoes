
const nodemailer = require('nodemailer');

let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: "daudiep2003@gmail.com",
        pass: "kxiunzutpxcvbbhf"
    }
})

let details = {
    from: "daudiep2003@gmail.com",
    to : "daudiep2003@gmail.com",
    subject: "testing our nodemailer",
    text: "testing out first sender"
}

mailTransporter.sendMail(details, (err) =>{
    if (err){
        console.log("it has an error" , err);
    }else {
        console.log("email has send !");
    }
})
