<?php
require 'vendor/autoload.php'; // Inclui o autoload do Composer

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true); // Instancia PHPMailer

try {
    // Configurações do servidor SMTP
    $mail->isSMTP();                                    // Ativar SMTP
    $mail->Host = 'smtp.gmail.com';                     // Definir o servidor SMTP
    $mail->SMTPAuth = true;                             // Habilitar autenticação SMTP
    $mail->Username = 'petresgate00@gmail.com';         // Seu e-mail
    $mail->Password = 'f x v g m c o d u g d w p c o h'; // Senha do app
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Habilitar criptografia TLS
    $mail->Port = 587;                                  // Porta TCP para conexão

    // Destinatários
    $mail->setFrom('petresgate00@gmail.com', 'Seu Nome'); // Seu nome
    $mail->addAddress('petresgate00@gmail.com', 'Destinatário'); // Adicionar um destinatário

    // Conteúdo do e-mail
    $mail->isHTML(true);                                  // Definir formato de e-mail para HTML
    $mail->Subject = 'Assunto do e-mail';
    $mail->Body    = 'Corpo do e-mail em <b>HTML</b>';
    $mail->AltBody = 'Corpo do e-mail em texto simples para clientes que não suportam HTML';

    $mail->send();                                       // Enviar e-mail
    echo 'Mensagem enviada com sucesso';                  // Mensagem de sucesso
} catch (Exception $e) {
    echo "Mensagem não enviada. Erro: {$mail->ErrorInfo}"; // Mensagem de erro
}
?>
