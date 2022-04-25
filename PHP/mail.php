<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require './src/PHPMailer.php';
require './src/Exception.php';
require './src/SMTP.php';
$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->SMTPDebug = SMTP::DEBUG_OFF;
    $mail->isSMTP();

    // add smtp host here
    $mail->Host = 'smtp.mailtrap.io';
    $mail->SMTPAuth = true;

    // add smtp username and password here
    $mail->Username = 'test';
    $mail->Password = 'test';

    //$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;           
    //$mail->Port       = 465;
    $mail->Port = 2525;

    //Recipients
    $mail->setFrom('from@example.com', 'Mailer');
    $mail->addAddress('joe@example.net', 'Joe User');
    $mail->addReplyTo('info@example.com', 'Information');

    //Content
    $mail->isHTML(true);
    $mail->Subject = 'contactform repressions_ru';


    // Message
    $name = strip_tags($_POST['name']);
    $email = strip_tags($_POST['email']);
    $subject = strip_tags($_POST['betreff']);
    $message = strip_tags($_POST['text']);

    if($subject && $message) {
        $mail->Body = 'new request from repression_ru <br />
                        name: ' . $name . '<br/>' .
            'e-mail: ' . $email . '<br/>' .
            'subject: ' . $subject . '<br/>' .
            'message: ' . $message;
        $mail->AltBody = 'new request from repression_ru' . PHP_EOL .
            'name: ' . $name . PHP_EOL .
            'e-mail: ' . $email . PHP_EOL .
            'subject: ' . $subject . PHP_EOL .
            'message: ' . $message;
        $mail->send();
    }

} catch (Exception $e) {
    echo $e->getMessage();

}
