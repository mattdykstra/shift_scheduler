<?php


//-----------------start checking for valid email and password for login from database --------------------------
function email_script($email, $subject,$message)
{
	
	
$to=$email;
$subject=$subject;

$message =$message;

$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

$headers .= 'From: staff@hodgepodge.com.au' . "\r\n";
	

return mail($to,$subject,$message,$headers);
}
//---------------end here-------------------- 


 ?>