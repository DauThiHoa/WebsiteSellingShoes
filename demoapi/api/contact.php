<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

echo($request);

$firstName = $request -> firstName;
$lastName = $request -> lastName;
$email = $request -> email;
$message = $request -> message;

$name = $firstName." ".$lastName

// create email
$to = "19130075@st.hcmuaf.edu.vn";
$email_subject = "Message from contact form on ad webapp: ".$name;
$email_body = "This is an automated email from ad webapp with the following message \n\n".
"Name of the person: ".$name.
"\n\n Email address: ".$email.
"\n\n Message: ".$message;
$headers = "From: daudiep2003@gmail.com";

// send email
mail($to, $email_subject,$email_body,$headers)

// post success or failure
if ( mail($to, $email_subject,$email_body,$headers) ){
    echo json_encode ("Success");
}else {
    echo json_encode ("Failure");
}
?>
