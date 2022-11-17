
require("dotenv").config();
const express = require("express");
const nodeMail = require("nodemailer");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

async function mainMail(name, email, subject, message) {
  const transporter = await nodeMail.createTransport({
    service: "gmail",
    auth: {
      user: "daudiep2003@gmail.com",
      pass: "diepthanhcong",
    },
  });
  const mailOption = {
    from: "daudiep2003@gmail.com",
    to: "daudiep2003@gmail.com",
    subject: subject,
    html: `You got a message from
    Email : ${email}
    Name: ${name}
    Message: ${message}`,
  };
  try {
    await transporter.sendMail(mailOption);
    return Promise.resolve("Message Sent Successfully!");
  } catch (error) {
    return Promise.reject(error);
  }
}

app.get("/email.component", (req, res) => {
  res.render(email.component.html);
});

app.get("/email.component", (req, res) => {
  res.render(email.component.html);
});

app.post("/email.component", async (req, res, next) => {
  const { yourname, youremail, yoursubject, yourmessage } = req.body;
  try {
    await mainMail(yourname, youremail, yoursubject, yourmessage);

    res.send("Message Successfully Sent!");
  } catch (error) {
    res.send("Message Could not be Sent");
  }
});

app.listen(3000, () => console.log("Server is running!"));
