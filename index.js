
const nodemailer = require('nodemailer');

let mailTransporter = nodemailer.createTransport({
    service : "gmail",
    auth:{
        user : "19130075@st.hcmuaf.edu.vn",
        pass: "mtxzghesacihdvqm"
    }
})

let details ={
    from: "19130075@st.hcmuaf.edu.vn",
    to: "daudiep2003@gmail.com",
    subject: "testing our nodemailer",
    text: "testing out first sender"
}

mailTransporter.sendMail(details, (err) =>{
    if(err){
        console.log("it has an error" , err)
    }else {
        console.log("email has sent !" , err)
    }
})
