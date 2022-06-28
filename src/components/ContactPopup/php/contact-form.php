<?php
/**
 * Contact form submit
 */

if (!isset($_POST['action'])) {
    sendJsonOutput([
        'data'    => 'Form not submitted.',
        'success' => false
    ]);
}

use PHPMailer\PHPMailer\PHPMailer;

require __DIR__ . '/phpmailer/PHPMailer.php';
require __DIR__ . '/phpmailer/Exception.php';

$data = $_POST;
$isValid = true;
$mailSent = false;
$attachments = [];

if (!empty($data['as_id']) || !empty($data['as_username']) || !empty($data['as_message'])) {
    $isValid = false;
}

if (empty($data['fullname']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL) || empty($data['phone']) || empty($data['message'])) {
    $isValid = false;
}

if (!isset($data['gdpr']) || $data['gdpr'] != 'on') {
    $isValid = false;
}

// Attachment
if (isset($_FILES['attachment']) && !empty($_FILES['attachment'])) {
    $total = count($_FILES['attachment']['name']);

    for ($i = 0; $i < $total; $i++) {
        if(is_uploaded_file($_FILES['attachment']['tmp_name'][$i])) {
            $allowed = ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx', 'zip'];
            $extension = pathinfo($_FILES['attachment']['name'][$i], PATHINFO_EXTENSION);

            if (!in_array($extension, $allowed)) {
                $isValid = false;
                $errorMessage = 'File type is not valid.';
            }

            if ($_FILES['attachment']['size'][$i] > 5000000) {
                $isValid = false;
                $errorMessage = 'File exceeds allowed size.';
            }

            if ($isValid) {
                $uploadDir = __DIR__ . '/' . $_FILES['attachment']['name'][$i];
                move_uploaded_file($_FILES['attachment']['tmp_name'][$i], $uploadDir);

                $attachments[] = $uploadDir;
            }
        }
    }
}

if ($isValid) {
    $mailSent = sendEmail($data, $attachments);

    foreach ($attachments as $attachment) {
        unlink($attachment);
    }
}

if ($isValid && $mailSent) {
    $output = [
        'data'    => 'Your message was successfully sent',
        'success' => true
    ];
} else {
    $output = [
        'data'    => 'An error occurred while processing the form',
        'success' => false
    ];
}

sendJsonOutput($output);

function sendEmail($data, $attachments = []) {
    $email = new PHPMailer();

    $email->isHTML(true);
    $email->CharSet = 'UTF-8';

    $email->setFrom('form@digihive.cz', 'Digihive');
    $email->addReplyTo($data['email'], $data['fullname']);
    $email->AddAddress('info@digihive.cz');

    $email->Subject = 'Message from contact form - Digihive Outsourcing';
    $email->Body = emailTemplate($data);

    foreach ($attachments as $attachment) {
        $email->addAttachment($attachment);
    }

    return $email->send();
}

function emailTemplate($data) {
    return 'Name: ' . $data['fullname'] . '<br>' .
           'Email: ' . $data['email'] . '<br>' .
           'Phone: ' . $data['phone'] . '<br>' .
           'Company: ' . $data['company'] . '<br><br>' .
           $data['message'];
}

function sendJsonOutput($output) {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($output);

    die();
}