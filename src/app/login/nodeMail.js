const nodemailer = require('nodemailer');

let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: "19130075@st.hcmuaf.edu.vn",
        pass: "H0345389984$"
    }
})

let details = {
    from: "19130075@st.hcmuaf.edu.vn",
    to : "19130075@st.hcmuaf.edu.vn",
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
