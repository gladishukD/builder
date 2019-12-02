<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


if(!empty($_POST['option']) && !empty($_POST['site']) && !empty($_POST['vorname']) && !empty($_POST['nachname']) && !empty($_POST['firmenname']) && !empty($_POST['telefon']) && !empty($_POST['email'])&& !empty($_POST['message'])){
    $htmlBody = 'category option: '.$_POST['option'].'<br>';
    $htmlBody .= 'site: '.$_POST['site'].'<br>';
    $htmlBody .= 'vorname: '.$_POST['vorname'].'<br>';
    $htmlBody .= 'nachname: '.$_POST['nachname'].'<br>';
    $htmlBody .= 'firmenname: '.$_POST['firmenname'].'<br>';
    $htmlBody .= 'telefon: '.$_POST['telefon'].'<br>';
    $htmlBody .= 'email: '.$_POST['email'].'<br>';
    $htmlBody .= 'message: '.$_POST['message'].'<br>';
} elseif (!empty($_POST['name']) && !empty($_POST['phone']) && !empty($_POST['mail']) && !empty($_POST['commentar'])){
    $htmlBody = 'name: '.$_POST['name'].'<br>';
    $htmlBody .= 'phone: '.$_POST['phone'].'<br>';
    $htmlBody .= 'mail: '.$_POST['mail'].'<br>';
    $htmlBody .= 'commentar: '.$_POST['commentar'].'<br>';
}else{
    echo 'Füllen Sie alle Felder aus!';
    die();
}


/**
 * This example shows settings to use when sending via Google's Gmail servers.
 */
//SMTP needs accurate times, and the PHP time zone MUST be set
//This should be done in your php.ini, but this is how to do it if you don't have access to that
date_default_timezone_set('Etc/UTC');
require 'PHPMailer/PHPMailerAutoload.php';
//Create a new PHPMailer instance
$mail = new PHPMailer;
$mail->CharSet = 'UTF-8';
//Tell PHPMailer to use SMTP
$mail->isSMTP();
//Enable SMTP debugging
// 0 = off (for production use)
// 1 = client messages
// 2 = client and server messages
$mail->SMTPDebug = 0;
//Ask for HTML-friendly debug output
$mail->Debugoutput = 'html';
//Set the hostname of the mail server
$mail->Host = 'smtp.gmail.com';
// use
// $mail->Host = gethostbyname('smtp.gmail.com');
// if your network does not support SMTP over IPv6
//Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
$mail->Port = 587;
//Set the encryption system to use - ssl (deprecated) or tls
$mail->SMTPSecure = 'tls';
//Whether to use SMTP authentication
$mail->SMTPAuth = true;
//Username to use for SMTP authentication - use full email address for gmail
// this login and pass to post company
$mail->Username = "gladishukd@gmail.com";
//Password to use for SMTP authentication
$mail->Password = "qwerty98D";


//Set who the message is to be sent from
// example email schupp@gmail.com
$mail->setFrom('gladishukd@gmail.com', 'Schupp Studio');
////Set an alternative reply-to address
//$mail->addReplyTo('replyto@example.com', 'First Last');
//Set who the message is to be sent to
// !!!!!!!!!!
$mail->addAddress('volyca222@gmail.com');
//Set the subject line
$mail->Subject = 'Neuer Beitrag auf der Website';
//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
$mail->Body = $htmlBody;
//Replace the plain text body with one created manually
$mail->AltBody = $htmlBody;
//send the message, check for errors
if (!$mail->send()) {
    echo "Mailer Error: " . $mail->ErrorInfo;
} else {
    echo "Danke für deine Behandlung!";
}
